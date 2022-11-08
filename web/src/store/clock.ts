import { defineStore } from 'pinia'
import type { Clock } from '../models/clock'
import {createClockByUserId, getClockByUserId} from "@/helpers/clock-helpers";
import user from "@/components/User.vue";

export const useClockStore = defineStore('clock', {
	state: () => ({
			clock: {} as Clock
	}),
	actions: {
		getClockByUserId(userId: number): Promise<void> {
			return getClockByUserId(userId).then((response: any) => this.clock = response.data.data)
		}
	}
})