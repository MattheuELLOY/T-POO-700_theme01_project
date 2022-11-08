import { defineStore } from 'pinia'
import type { User } from '../models/user'
import { getAllUsers, getUser, getUserToken } from '@/helpers/user-helper'

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			user: {} as User,
			allUser: [] as User[]
		}
	},
	actions: {
		getAll(): void {
			getAllUsers().then((response) => this.allUser = <User[]>response.data.data)
		},
		get(id: number): void {
			if (id) {
				getUser(id).then((response) => this.user = response.data.data)
			}
		},
		getByToken(): Promise<User> {
			return getUserToken().then((response) => this.user = response.data.data)
		},
		delete(): void {
			this.user.id = -1
			this.user.email = ""
			this.user.username = ""
		}
	}
})