import Vue from 'vue';

import VueRouter from 'vue-router';

import ListView from '../views/list';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
      {
        path: '/',
        component: ListView
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

