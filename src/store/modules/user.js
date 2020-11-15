import UsersDataService from '@/services/UsersDataService'

export default {
  state: {
    user: {},
    me: {},
    someUsers: []
  },
  actions: {
    GET_USER_FROM_DB({commit}, id) {
      return UsersDataService.get(id)
        .then((item) => {
          commit('SET_USER', item.data)
          return item
        })
        .catch((error) => {
          return error
        })
    },
    GET_ME({commit}) {
      return UsersDataService.authUser()
        .then(user => {
          commit('SET_ME', user.data)
        })
        .catch((error) => {
          return error
        })
    },
    async GET_SOME_USERS({commit}, users) {
      const someUsers = await UsersDataService.someUsers(users)
        .then(res => {
          return res.data.users
        })
        .catch((error) => {
          return error
        })
        commit('SET_SOME_USERS', someUsers)
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