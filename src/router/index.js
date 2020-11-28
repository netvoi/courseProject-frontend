import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/user/:id',
    name: 'user',
    meta: {
      requireAuth: true,
      layout: 'main'
    },
    component: () => import('../views/User.vue'),
  },
  {
    path: '/series/:id',
    name: 'tvSeries',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/TvSeries.vue'),
  },
  {
    path: '/inbox',
    name: 'inbox',
    meta: {
      layout: 'chat'
    },
    component: () => import('../views/Inbox.vue'),
  },
  {
    path: '/inbox/im:id',
    name: 'dialog',
    meta: {
      layout: 'chat'
    },
    component: () => import('../views/Dialog.vue'),
  },
  {
    path: '/',
    name: 'listSerials',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/ListSerials.vue'),
    
  },
  {
    path: '/auth',
    name: 'auth',
    meta: { 
      guest: true,
      layout: 'auth'
    },
    component: () => import('../views/Auth.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    if(!store.getters.IS_LOGGED_IN) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(!store.getters.IS_LOGGED_IN) {
      next()
    } else {
      next({
        path: '/',
        params: { nextUrl: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router;
