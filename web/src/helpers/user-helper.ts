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

export function getUserToken(): Promise<User[]> {
  return HTTP.get('auth')
}

export function loginUser(email: string, password: string): Promise<User> {
  return HTTP.post('login', {
    "email": email,
    "password": password,
  })
}

export function postUser(email: string, username: string, password: string): Promise<void> {
  return HTTP.post('register', {
    "email": email,
    "username": username,
    "password": password,
  })
}

export function putUser(userID: number, email: string, username: string): Promise<void> {
  return HTTP.put('users/' + userID, {
    "user": {
      "email": email,
      "username": username
    }
  })
}
export function deletedUser(userID: number): Promise<void> {
  return HTTP.delete('users/' + userID)
}