import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

/* JS */
import 'materialize-css/dist/js/materialize.min';

/* SCSS */
import './assets/scss/style.scss';
import 'bootstrap/scss/bootstrap-grid.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
