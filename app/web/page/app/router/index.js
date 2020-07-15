import Vue from 'vue';

import VueRouter from 'vue-router';

import ListView from '../views/list';
// import Home from '../views/home';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/home/'),
      },
      {
        path: '/errList',
        name: 'ErrList',
        component: () => import('../views/home/errList/'),
      },
      {
        path: '/errDetail',
        name: 'ErrDetail',
        component: () => import('../views/home/errList/detail'),
      },
      {
        path: '/perfList',
        name: 'PerfList',
        component: () => import('../views/home/perfList/'),
      },
      {
        path: '/perfDetail',
        name: 'PerfDetail',
        component: () => import('../views/home/perfList/detail'),
      },


      {
        path: '/list',
        component: ListView
      },
      {
        path: '/detail/:id',
        component: () => import('../views/detail')
      },
      {
        path: '/useSkills',
        component: () => import('../views/useSkills')
      },
    ]
  });
}

