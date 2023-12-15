import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import AttendanceView from '@/views/AttendanceView.vue'
import SignIn from '@/views/SignIn.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/CompliteBase.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/attendance',
          name: 'attendance',
          component: AttendanceView
        }
      ]
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/sign-in']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !authStore.isSignIn) {
    return '/sign-in'
  }
})


export default router
