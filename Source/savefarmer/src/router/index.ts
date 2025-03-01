import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/SignUp'
  }, 
  {
    path: '/SignUp',
    component: () => import ('@/pages/SignUp.vue')
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
    path: '/About',
    component: () => import ('@/pages/AboutPage.vue')
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
  },
  // {
  //   path: '/database',
  //   component: () => import ('@/pages/database.vue')
  // },
  {
    path: '/AdminPage',
    component: () => import ('@/pages/AdminPage.vue')
  },
  {
    path: '/ManageUsers',
    name: 'ManageUsers',
    component: () => import ('@/pages/ManageUsers.vue')
  },
  {
    path: '/Transactions',
    name: 'Transactions',
    component: () => import ('@/pages/Transactions.vue')
  },
  {
    path: '/AppSettings',
    name: 'AppSettings',
    component: () => import ('@/pages/AppSettings.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
//this redirect all traffic to that is not login, signup or home to login if there no access token
// Ctrl + / to comment out code

// router.beforeEach((to, from, next) => {
//   const token = sessionStorage.getItem('AccessToken');
//   if (!token && to.path !== '/Login' && to.path !== '/SignUp' && to.path !== '/Home') {
//     next('/Login');
//   }
//   else if (token && (to.path === '/Login' || to.path === '/SignUp')) {
//     next('/Home');
//   }
//    else {
//     next();
//   }
// });

export default router
