import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/Login'
  },
  {
    path: '/Login',
    component: () => import ('@/pages/LogPage.vue')
  },
  {
    path: '/Profile',
    component: () => import ('@/pages/Profile.vue')
  },
  {
    path: '/SignUp',
    component: () => import ('@/pages/SignUp.vue')
  },
  {
    path: '/Home',
    component: () => import ('@/pages/Home.vue')
  },
  {
    path: '/reset-password',
    component: () => import ('@/pages/ForgotPassword.vue')
  },
  {
    path: '/:id',
    component: () => import ('@/pages/FolderPage.vue')
  }
  

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
