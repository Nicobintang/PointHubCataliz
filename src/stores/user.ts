import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const authData = [
    {
      email: 'admin@gmail.com',
      username: 'Admin',
      password: 'admin',
      roles: 'admin'
    },
    {
      email: 'user@gmail.com',
      username: 'Hafiz',
      password: 'user',
      roles: 'user'
    }
  ]

  const userData: object[] = []

  return { authData, userData }
})
