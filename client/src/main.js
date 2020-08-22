import Vue from 'vue';
import firebase from 'firebase';
import * as VueGoogleMaps from 'vue2-google-maps';

import App from './App.vue';
import router from './router';
import store from './store';

import './registerServiceWorker';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
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
    key: process.env.VUE_APP_GOOGLE_API_KEY
  },
  installComponents: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
