import { defineStore } from 'pinia'
import type { Workingtime } from '@/models/workingtime'
import {getAllWorkingTimes, getWorkingTime} from '@/helpers/workingtime-helper'

export const useWorkingTime = defineStore('workingtime', {
	state: () => ({
		allWorkingTime: [] as Workingtime[],
	}),
	actions: {
		getAll(idUser: number): void {
			getWorkingTime(idUser).then((response: any) => this.allWorkingTime = <Workingtime[]>response.data.data)
		},
	}
})