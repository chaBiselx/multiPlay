import Vue from 'vue'
import Router from 'vue-router'

//templates

import store from '@/store'

import HomePage from '@/components/HomePage'
import MenuPage from '@/components/MenuPage'
import PlaylistPage from '@/components/PlaylistPage'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',
    	name: 'HomePage',
    	component: HomePage,
    },
    {
      path: '/About',
      name: 'About',
      component: About,

    },
    {
      path: '*',
      redirect: '/'
    }

  ]
})
