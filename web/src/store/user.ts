import { defineStore } from 'pinia'
import type { User } from '../models/user'
import axios from 'axios'

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			user: {} as User
		}
	},
	actions: {
		getUserByFilter(email: string, username: string): User {
			axios
				.get('http://localhost:4000/api/users?email=' + email + '&username=' + username)
				.then(response => (this.user = response.data))
			return this.user
		},
		getUser(userID: number): User {
			axios
				.get('http://localhost:4000/api/users' + userID)
				.then(response => (this.user = response.data))
			return this.user
		},
		postUser(email: string, username: string): void {
			axios
				.post('http://localhost:4000/api/users/', {
					params:
					{
						"user": {
							"email": email,
							"username": username
						}
					}
				})
		},
		putUser(userID: number, email: string, username: string): void {
			axios
				.put('http://localhost:4000/api/users' + userID, {
					params:
					{
						"user": {
							"email": email,
							"username": username
						}
					}
				})
		}
	}
})