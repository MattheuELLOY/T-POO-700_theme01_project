import HTTP from "@/http-common"
import type { User } from "@/models/user"

export function getByFilter(email: string, username: string): Promise<User> {
  return HTTP
    .get('users?email=' + email + '&username=' + username)
    .then((response) => (<User>response.data.data[0]))
}

export function getUser(userID: number): Promise<User> {
  return HTTP.get('users/' + userID)
}

export function getAllUsers(): Promise<User[]> {
  return HTTP.get('users')
}

export function post(email: string, username: string): void {
  HTTP
    .post('users', {
      "user": {
        "email": email,
        "username": username
      }
    })
    getByFilter(email, username)
}

export function put(userID: number, email: string, username: string): void {
  HTTP
    .put('users' + userID, {
      "user": {
        "email": email,
        "username": username
      }
    })
}
export function deleted(userID: number): void {
  HTTP.delete('users/' + userID)
}