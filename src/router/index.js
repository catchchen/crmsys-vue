import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Test from '../views/Test'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }, {
    path: '/test',
    // redirect: '/' component: () => import('../views/Login.vue')
    name: 'Test',
    component: Test
  }, {
    path: '/home',
    name: 'Home',
    redirect: '/sysindex',
    component: Home,
    children: [
      // {
      //   redirect: '/home/',
      //   component: () => import('../views/mainpages/addUser.vue')
      // },
      {
        path: '/updateUser/:id', // 动态路由参数
        name: 'updateUser',
        component: () => import('../views/mainpages/UpdateUser.vue')
      },
      {
        path: '/sysindex',
        name: 'sysindex',
        component: () => import('../views/mainpages/SysIndex.vue')
      },
      {
        path: '/addUser',
        name: 'addUser',
        component: () => import('../views/mainpages/AddUser.vue')
      },
      {
        path: '/editPassword',
        name: 'editPassword',
        component: () => import('../views/mainpages/EditPassword.vue')
      },
      {
        path: '/customer',
        name: 'customer',
        component: () => import('../views/mainpages/Custom.vue')
      },
      {
        path: '/employee',
        name: 'employee',
        component: () => import('../views/mainpages/Employee.vue')
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('../views/mainpages/Product.vue')
      },
      {
        path: '/analyse',
        name: 'analyse',
        component: () => import('../views/mainpages/Analyse.vue')
      },
      {
        path: '/location',
        name: 'location',
        component: () => import('../views/mainpages/Location.vue')
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
