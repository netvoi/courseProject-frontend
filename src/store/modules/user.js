import UsersDataService from '@/services/UsersDataService'

export default {
  state: {
    user: {},
    me: {},
    someUsers: []
  },
  actions: {
    async GET_USER_FROM_DB({commit}, id) {
      const user = await UsersDataService.get(id)
        .then(response => response)
        .catch(error => error.response)

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
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
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
    ME(state) {
      return state.me
    },
    SOME_USERS(state) {
      return state.someUsers
    }
  }
}