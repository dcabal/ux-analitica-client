import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
