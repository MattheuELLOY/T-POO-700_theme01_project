import { defineStore } from 'pinia'
import type { Workingtime } from '@/models/workingtime'
import { getWorkingTime } from '@/helpers/workingtime-helper'

export const useWorkingTime = defineStore('workingtime', {
	state: () => ({
		allWorkingTime: [] as Workingtime[]
	}),
	actions: {
		getAll(idUser: number): void {
			getWorkingTime(idUser).then((response) => this.allWorkingTime = <Workingtime[]>response.data.data)
		},
	}
})