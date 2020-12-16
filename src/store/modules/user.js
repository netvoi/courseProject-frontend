import UsersDataService from '@/services/UsersDataService'

export default {
  state: {
    allUsers: [],
    user: {},
    me: {},
    someUsers: [],
    root: 'http://localhost:8081/static/uploads/'
  },
  actions: {
    async GET_ALL_USERS({commit}) {
      const res = await  UsersDataService.getAll()
        .then(response => response)
        .catch(error => console.error(error))

      commit('SET_ALL_USERS', res.data.users)
      return res
    },
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
    },
    async UPDATE_USER_DATA({commit}, data) {
      await UsersDataService.updateData(data)
        .then(response => response)
        .catch(error => error.response);
    },
    async UPDATE_USER_PASSWORD({commit}, password) {
      await UsersDataService.updatePassword(password)
        .then(response => response)
        .catch(error => error.response);
    }
  },
  mutations: {
    SET_ALL_USERS: (state, users) => {
      state.allUsers = users
    },
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
    ALL_USERS(state) {
      return state.allUsers
    },
    USER(state) {
      return state.user
    },
    ROOT(state) {
      return state.root
    },
    ME(state) {
      return state.me
    },
    SOME_USERS(state) {
      return state.someUsers
    }
  }
}
