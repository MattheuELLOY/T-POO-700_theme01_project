import { defineStore } from 'pinia'
import type { User } from '../models/user'
import { getAllUsers, getUser } from '@/helpers/user-helper'

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			user: {} as User,
			allUser: [] as User[]
		}
	},
	actions: {
		getAll(): void {
			getAllUsers().then((response) => this.allUser = response.data.data)
		},
		get(id: number): void {
			getUser(id).then((response) => this.user = response.data.data)
		}
	}
})