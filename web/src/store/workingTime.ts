import { defineStore } from 'pinia'
import type { Workingtime } from '@/models/workingtime'
import HTTP from '../http-common'
import type { AxiosResponse } from 'axios'



interface WorkingTimeAction {
	post: (idUser: Number, start: Date, end: Date) => void
	put: (idWorkingTime: Number, start: Date, end: Date) => void
	delete: (idWorkingTime: Number) => void
	getAll: (idUser: number) => void
}
interface WorkingTimeState {
	arrayWorkingTime: Workingtime[]
	workingtime: Workingtime | null
	responseStatus: Number
	isLoading: boolean
}

export const useWorkingTime = defineStore<"workingtime", WorkingTimeState, any, WorkingTimeAction>('workingtime', {
	state: () => ({
		workingtime: null,
		responseStatus: 0,
		arrayWorkingTime: [],
		isLoading: false,

	}),
	actions: {
		post(idUser: Number, start: Date, end: Date) {
			console.log(start)
			HTTP
				.post("workingtimes/" + idUser, {
					"workingtime": {
						"start": start.toISOString(),
						"end": end.toISOString()
					}
				})
				.then((response) => (this.workingtime = <Workingtime>response.data))
			return this.workingtime
		},
		put(idWorkingTime: Number, start: Date, end: Date) {
			HTTP
				.put("workingtimes/" + idWorkingTime, {
					"workingtime": {
						"start": start.toISOString(),
						"end": end.toISOString()
					}
				})
				.then((response) => (this.workingtime = <Workingtime>response.data))
			return this.workingtime
		},
		delete(idWorkingTime: Number) {
			HTTP
				.delete("workingtimes/" + idWorkingTime)
				.then((response) => {
					if(response.status == 204){
						this.arrayWorkingTime = [...this.arrayWorkingTime.filter(x => x.id != idWorkingTime)]
					}
				})
		},
		getAll(idUser: Number) {
			this.isLoading = true
			HTTP
				.get("workingtimes/" + idUser)
				.then(response => {
					this.arrayWorkingTime = response.data.data
					this.isLoading = false
				})
		},

	}
})

