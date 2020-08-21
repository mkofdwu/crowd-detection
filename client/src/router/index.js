import Vue from 'vue';
import VueRouter from 'vue-router';

import Map from '@/views/Map.vue';
import AddLocation from '@/views/AddLocation.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Map',
    component: Map
  },
  {
    path: '/add-location',
    name: 'add-location',
    component: AddLocation,
    props: route => ({
      file: route.params.file,
      timestamp: route.params.timestamp
    })
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
