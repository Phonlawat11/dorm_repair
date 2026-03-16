import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserDashboard from '../views/UserDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue' // <--- เช็คตัวสะกดตรงนี้

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/user', name: 'user-dashboard', component: UserDashboard },
  { path: '/admin', name: 'admin-dashboard', component: AdminDashboard } // <--- และตรงนี้
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router