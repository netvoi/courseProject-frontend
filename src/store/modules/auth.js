import AuthDataService from '@/services/AuthDataService'

export default {
  state: {
    jwt: localStorage.getItem('jwt') || '',
  },
  actions: {
    async REGISTER({commit}, user) {
      const res = await AuthDataService.register(user)
        .then(response => response)
        .catch(error => error.response)

      if(res.status === 200) {
        const jwt = res.data.token
        localStorage.setItem('jwt', jwt)
        commit('REGISTER_SUCCESS', jwt)
      }
      return res
    },
    async LOGIN({commit}, user) {
      const res = await AuthDataService.login(user)
        .then(response => response)
        .catch(error => error.response)

      if(res.status === 200) {
        const jwt = res.data.token
        localStorage.setItem('jwt', jwt)
        commit('LOGIN_SUCCESS', jwt)
      }
      return res
    },
    LOGOUT({commit}) {
      localStorage.removeItem('jwt')
      commit('EXEC_LOGOUT')
    }
  },
  mutations: {
    REGISTER_SUCCESS: (state, response) => {
      state.jwt = response.jwt
    },
    LOGIN_SUCCESS: (state, response) => {
      state.jwt = response.jwt
    },
    EXEC_LOGOUT: state => {
      state.jwt = ''
    },
  },
  getters: {
    SUB(state) {
      return state.userDetected
    },
    IS_LOGGED_IN(state) {
      return !!state.jwt
    }
  }
}