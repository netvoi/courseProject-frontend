import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'
import Vuelidate from 'vuelidate'
import VueHotkey from 'v-hotkey'
import { EmojiPickerPlugin } from 'vue-emoji-picker'
import './registerServiceWorker'

/* JS */
import 'materialize-css/dist/js/materialize.min'

/* SCSS */
import './assets/scss/style.scss'
import 'bootstrap/scss/bootstrap-grid.scss'


const socketInstance = io('http://localhost:8081/', {
  transports: ['websocket'],
});

/* Socket io */
Vue.use(new VueSocketIO({
  debug: false,
  connection: socketInstance,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))

Vue.use(Vuelidate)
Vue.use(VueHotkey)
Vue.use(EmojiPickerPlugin)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
