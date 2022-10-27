import { defineStore } from 'pinia'
import type { User } from '../models/user'
import HTTP from '../http-common'

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			user: {} as User
		}
	},
	actions: {
		getByFilter(email: string, username: string): User {
			HTTP
				.get('users?email=' + email + '&username=' + username)
				.then(response => (this.user = response.data))
			return this.user
		},
		get(userID: number): User {
			HTTP.get('users/' + userID).then(response => (this.user = response.data))
			return this.user
		},
		post(email: string, username: string): void {
			HTTP
				.post('users', {
					"user": {
						"email": email,
						"username": username
					}
				})
				this.getByFilter(email, username)
		},
		put(userID: number, email: string, username: string): void {
			HTTP
				.put('users' + userID, {
					"user": {
						"email": email,
						"username": username
					}
				})
		},
		delete(userID: number): void {
			HTTP.delete('users/' + userID)
			this.user.email = ''
			this.user.username = ''
		}
	}
})