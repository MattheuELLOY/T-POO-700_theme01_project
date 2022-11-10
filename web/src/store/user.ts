import { defineStore } from 'pinia'
import type { User } from '../models/user'
import { getAllUsers, getUser, getUserToken } from '@/helpers/user-helper'

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			user: {} as User,
			selectedUser: {} as User,
			allUser: [] as User[]
		}
	},
	actions: {
		getAll(): void {
			getAllUsers().then((response: any) => this.allUser = response.data.data)
		},
		get(id: number): void {
			if (id) {
				getUser(id).then((response: any) => this.user = response.data.data)
			}
		},
		getSelected(id: number): void {
			if (id) {
				getUser(id).then((response: any) => this.selectedUser = response.data.data)
			}
		},
		getByToken(): Promise<User> {
			return getUserToken().then((response: any) => this.user = response.data.data)
		},
		delete(): void {
			this.user.id = -1
			this.user.email = ""
			this.user.username = ""
		}
	}
})