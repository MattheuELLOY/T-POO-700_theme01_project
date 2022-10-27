import { defineStore } from 'pinia'
import type { Workingtime } from '@/models/workingtime'
import axios from 'axios'

export const useClockStore = defineStore('clock', {
	state: () => ({
			workingtime: {} as Workingtime
	}),
	actions: {
		get(userID: number, id: number): Workingtime {
			axios
				.get('workingtimes/' + userID + '/' + id)
				.then(response => (this.workingtime = response.data))
			return this.workingtime
		},
		post(userID: number, end: Date, start: Date): void {
			axios.post('workingtimes/' + userID, {
				"workingtime":
				{
						"end": end,
						"start": start
				}
			})
		}
	}
})