import { defineStore } from 'pinia'
import type { Workingtime } from '@/models/workingtime'
import axios from 'axios'
import HTTP from '../http-common'
import type { AxiosResponse } from 'axios'

export const useWorkingTime = defineStore('workingtime', {
	state: () => ({
			workingtime: {} as Workingtime,
			responseStatus: 0 as Number,
			arrayWT: {} as Array<Workingtime>
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
			.then((response: AxiosResponse) => (this.responseStatus = response.status))
			return this.responseStatus
		},
		getAll(idUser : Number){
			console.log(idUser)
			console.log("getAll")
			HTTP
			.get("workingtimes/" + idUser)
			.then((response: AxiosResponse) => (this.arrayWT = response.data))

			console.log(this.arrayWT)
			return this.arrayWT
		}, 

	}
})