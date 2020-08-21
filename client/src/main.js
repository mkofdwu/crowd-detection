import Vue from 'vue';
import firebase from 'firebase';
import * as VueGoogleMaps from 'vue2-google-maps';

import App from './App.vue';
import router from './router';
import store from './store';

import './registerServiceWorker';

const firebaseConfig = {
  apiKey: 'AIzaSyA8RKRG4elTVBMbCmgFSV7qYhcb7XfU8G8',
  authDomain: 'crowd-density.firebaseapp.com',
  databaseURL: 'https://crowd-density.firebaseio.com',
  projectId: 'crowd-density',
  storageBucket: 'crowd-density.appspot.com',
  messagingSenderId: '141542414666',
  appId: '1:141542414666:web:256c604608755d3f4889b3'
};
firebase.initializeApp(firebaseConfig);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCao_rOu22gHeo659xzAozYvtyjuiXyM4s'
  },
  installComponents: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
