import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useAuthStore = defineStore('auth', () => {
  const username = ref('')
  const emailUser = ref('')
  const role = ref('')
  const isSignIn = ref(false)
  const userStore = useUserStore()

  const SignIn = (email: string, password: string): void => {
    userStore.authData.forEach((user: any) => {
      if (user.email === email && user.password === password) {
        username.value = user.username
        emailUser.value = user.email
        role.value = user.roles
        isSignIn.value = true
        console.log(username.value, role.value)
      }
    })
  }

  return { username, role, isSignIn, SignIn, emailUser }
})
