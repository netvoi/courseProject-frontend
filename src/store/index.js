import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import series from './modules/series'
import userSerials from './modules/userSerials'
import auth from './modules/auth'
import friends from './modules/friends'
import socket from './modules/socket'
import filter from './modules/filter'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    series,
    userSerials,
    auth,
    friends,
    socket,
    filter
  }
});
