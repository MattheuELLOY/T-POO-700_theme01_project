import { defineStore } from 'pinia'
import type { Workingtime } from '@/models/workingtime'
import HTTP from '../http-common'
import type { AxiosResponse } from 'axios'



interface WorkingTimeAction {
	post: (idUser: Number, start: string, end: string) => void
	put: (idWorkingTime: Number, start: string, end: string) => void
	delete: (idWorkingTime: Number) => void
	getAll: (idUser: number) => void
	setUpdateWt: (id : Number | null) => void
}
interface WorkingTimeState {
	arrayWorkingTime: Workingtime[]
	workingtime: Workingtime | null
	responseStatus: Number
	isLoading: boolean
	updateWt : Number | null
}

export const useWorkingTime = defineStore<"workingtime", WorkingTimeState, any, WorkingTimeAction>('workingtime', {
	state: () => ({
		workingtime: null,
		responseStatus: 0,
		arrayWorkingTime: [],
		isLoading: false,
		updateWt : null
	}),
	actions: {
		post(idUser: Number, start: string, end: string) {
			console.log(start)
			HTTP
				.post("workingtimes/" + idUser, {
					"workingtime": {
						"start": start,
						"end": end
					}
				})
				.then((response) => (this.workingtime = <Workingtime>response.data))
			return this.workingtime
		},
		put(idWorkingTime: Number, start: string, end: string) {
			HTTP
				.put("workingtimes/" + idWorkingTime, {
					"workingtime": {
						"start": start,
						"end": end
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

		setUpdateWt(id : Number | null){
			this.updateWt = id
			console.log(id)
		}

	}
})

