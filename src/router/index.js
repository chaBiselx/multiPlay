import Vue from 'vue'
import Router from 'vue-router'

//templates

import store from '@/store'

import HomePage from '@/components/HomePage'
import MenuPage from '@/components/MenuPage'
import About from '@/components/About'
import PlaylistPage from '@/components/PlaylistPage'
import ListMusic from '@/components/ListMusic'
import MusicPlayerPage from '@/components/MusicPlayerPage'


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
      path: '/PlaylistPage',
      name: 'PlaylistPage',
      component: PlaylistPage,

    },
    {
      path: '/ListMusic',
      name: 'ListMusic',
      component: ListMusic,

    },
    {
      path: '/MusicPlayerPage',
      name: 'MusicPlayerPage',
      component: MusicPlayerPage,

    },
    {
      path: '*',
      redirect: '/'
    }

  ]
})
