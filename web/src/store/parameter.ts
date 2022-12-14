import { defineStore } from 'pinia'
import type { Parameter } from '../models/parameter'
import { getAllParameters, getParameter } from '@/helpers/parameter-helper'

export const useParameterStore = defineStore('parameter', {
	state: () => {
		return {
			parameter: {} as Parameter,
			allParameter: [] as Parameter[]
		}
	},
	actions: {
		getAll(): void {
			getAllParameters().then((response: any) => this.allParameter = response.data.data)
		},
		get(id: number): void {
			getParameter(id).then((response: any) => this.parameter = response.data.data)
		}
	}
})