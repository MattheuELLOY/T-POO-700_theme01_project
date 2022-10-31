import { defineStore } from 'pinia'
import type { Clock } from '../models/clock'
import {createClockByUserId, getClockByUserId} from "@/helpers/clock-helpers";
import user from "@/components/User.vue";

export const useClockStore = defineStore('clock', {
	state: () => ({
			clock: {} as Clock,
		    createClock: {} as Clock,
	}),
	actions: {
		getClockByUserId(userId: number): void {
			getClockByUserId(userId).then((response) => this.clock = response.data.data)
		},
		createClockByUserId(userId: number): void {
			createClockByUserId(userId).then((response)) => this.createClock = response.data.data)
		}

	}
})