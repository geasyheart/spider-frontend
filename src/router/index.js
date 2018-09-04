import Vue from 'vue'
import Router from 'vue-router'
import Manage from '@/components/manage'
import Login from '@/components/user/login'
import Register from '@/components/user/register'

import Home from '@/components/home'
import ListUser from '@/components/user/listUser'
import ListPolicy from '@/components/policy/listPolicy'
import CreatePolicy from '@/components/policy/createPolicy'
import ListClient from '@/components/client/listClient'
import Admin from '@/components/user/admin'

// import ListTask from '@/components/task/listTask'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Manage',
      component: Manage,
      children: [
      // 这里为主页
      {
        path: '',
        component: Home,
        redirect: '/users'
      },
        {
          path: '/users',
          component: ListUser
        },
        {
          path: '/policies',
          component: ListPolicy
        },
        {
          path: '/policy',
          component: CreatePolicy
        },
        // {
        //   path: '/task',
        //   component: ListTask
        // },
        {
          path: '/client',
          component: ListClient
        },
        {
          path: '/admin',
          component: Admin
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }

  ]
})
