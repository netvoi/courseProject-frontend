import AuthDataService from '../../services/AuthDataService'
import axios from 'axios'

export default {
  state: {
    jwt: localStorage.getItem('jwt') || '',
    isAuth: localStorage.getItem('status') || false,
    userDetected: localStorage.getItem('sub') || null
  },
  actions: {
    LOGIN({commit}, user) {
      AuthDataService.login(user)
        .then(res => {
          const jwt = res.data.token
          const sub = res.data.user.id
          const status = res.data.success

          axios.defaults.headers.common['Authorization'] = jwt

          localStorage.setItem('jwt', jwt)
          localStorage.setItem('sub', sub)
          localStorage.setItem('status', status)

          commit('LOGIN_SUCCESS', { jwt, sub, status })
        })
        .catch(err => {
          console.log('LOGIN_FAIL');
          commit('LOGIN_FAIL', err)
        })
    },
    LOGOUT({commit}) {
      commit('EXEC_LOGOUT')
    }
  },
  mutations: {
    LOGIN_SUCCESS: (state, res) => {
      state.jwt = res.jwt
      state.isAuth = res.status
      state.userDetected = res.sub
    },
    LOGIN_FAIL: state => {
      console.log('error');
    },
    EXEC_LOGOUT: state => {
      state.jwt = ''
      state.isAuth = ''
      state.userDetected = ''

      localStorage.removeItem('jwt')
      localStorage.removeItem('sub')
      localStorage.removeItem('status')
    }
  },
  getters: {
    SUB(state) {
      return state.userDetected
    },
    IS_LOGGED_IN(state) {
      return state.isAuth
    }
  }
}