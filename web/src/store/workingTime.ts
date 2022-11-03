import { defineStore } from 'pinia'
import type { Workingtime } from '@/models/workingtime'
import { getWorkingTime } from '@/helpers/workingtime-helper'

export const useWorkingTime = defineStore('workingtime', {
	state: () => ({
		workingtime: {} as Workingtime,
		allWorkingTime: [] as Workingtime[]
	}),
	actions: {
		getAll(idUser: number): void {
				getWorkingTime(idUser).then((response) => this.allWorkingTime = <Workingtime[]>response.data.data)
			},
		delete(): void {
			this.workingtime.id = -1
			this.workingtime.end = new Date()
			this.workingtime.start = new Date()
		}
	}
})