import UsersDataService from '@/services/UsersDataService'
import axios from 'axios'

export default {
  state: {
    user: {},
    me: {},
    someUsers: [],
    src: ''
  },
  actions: {
    async GET_USER_FROM_DB({commit}, id) {
      const user = await UsersDataService.get(id)
        .then(response => response)
        .catch(error => error.response)

      /* await axios.get(`http://localhost:8081/api/upload/id${id}`, {
        responseType: 'arraybuffer',
        headers: { 'Authorization': localStorage.getItem('jwt')}
      })
        .then(response => {
          const bytes = new Uint8Array(response.data)
          const blob = new Blob([bytes.buffer])
          const reader = new FileReader()

          reader.readAsDataURL(blob)

          reader.addEventListener('load', e => {
            commit('SET_AVATAR', e.target.result)
          })
        })
        .catch(error => error.response) */

      commit('SET_USER', user.data)
    },
    async GET_ME({commit}) {
      const user = await UsersDataService.authUser()
        .then(response => response)
        .catch(error => error.response)

      commit('SET_ME', user.data)
    },
    async GET_SOME_USERS({commit}, users) {
      const someUsers = await UsersDataService.someUsers(users)
        .then(response => response)
        .catch(error => error.response)
      
      commit('SET_SOME_USERS', someUsers.data.users)
    },
    async UPDATE_USER_DATA({commit}, data) {
      const res = await UsersDataService.updateData(data)
        .then(response => response)
        .catch(error => error.response)
    },
    async UPDATE_USER_PASSWORD({commit}, password) {
      const res = await UsersDataService.updatePassword(password)
        .then(response => response)
        .catch(error => error.response)

      console.log(res);
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_AVATAR: (state, src) => {
      src === 'data:'
      ? state.src = ''
      : state.src = src
    },
    SET_ME: (state, me) => {
      state.me = me
    },
    SET_SOME_USERS: (state, someUsers) => {
      state.someUsers = []
      state.someUsers = someUsers
    }
  },
  getters: {
    USER(state) {
      return state.user
    },
    SRC(state) {
      return state.src
    },
    ME(state) {
      return state.me
    },
    SOME_USERS(state) {
      return state.someUsers
    }
  }
}