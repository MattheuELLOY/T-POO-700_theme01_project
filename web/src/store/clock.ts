import { defineStore } from 'pinia'
import type { Clock } from '../models/clock'
import axios from 'axios'

export const useClockStore = defineStore('clock', {
	state: () => ({
			clock: {} as Clock
	}),
	actions: {
		getClock(userID: number): Clock {
			axios
				.get('clocks/' + userID)
				.then(response => (this.clock = response.data))
			return this.clock
		},
		postClock(userID: number): void {
			axios.post('clocks/' + userID)
		}
	}
})