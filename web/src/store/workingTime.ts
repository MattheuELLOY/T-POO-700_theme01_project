import { defineStore } from 'pinia'
import type { Workingtime } from '@/models/workingtime'
import HTTP from '../http-common'
import type { AxiosResponse } from 'axios'

export const useWorkingTime = defineStore('workingtime', {
	state: () => ({
			workingtime: {} as Workingtime,
			responseStatus: 0 as Number,
			arrayWorkingTime: {} as Array<Workingtime>
			
	}),
	actions: {
		post(idUser : Number, start : Date, end : Date){
			HTTP
			.post("workingtimes/" + idUser,{
				"workingtime": {
					"start": start,
					"end": end
				}
			})
			.then((response: AxiosResponse) => (this.workingtime = <Workingtime>response.data))
		return this.workingtime
		}, 
		put(idWorkingTime : Number, start : Date, end : Date){
			HTTP
			.put("workingtimes/" + idWorkingTime,{
				"workingtime": {
					"start": start,
					"end": end
				}
			})
			.then((response: AxiosResponse) => (this.workingtime = <Workingtime>response.data))
			return this.workingtime
		}, 
		delete(idWorkingTime : Number){
			HTTP
			.delete("workingtimes/" + idWorkingTime)
			.then((response: AxiosResponse) => (console.log(response.status)))
			console.log("Fin delete")
			return this.responseStatus
		},
		getAll(idUser : Number){
			console.log(idUser)
			console.log("getAll")
			HTTP
			.get("workingtimes/" + idUser)
			.then(response => (this.arrayWorkingTime = response.data.data))
			
			console.log(this.arrayWorkingTime)
			return this.arrayWorkingTime
		}, 

	}
})