export default {
  state: {
    socket: '',
    messages: []
  },
  actions: {
    GET_SOCKET({commit}, socket) {
      commit('SET_SOCKET', socket)
    },
    SOCKET_GET_DATA({commit}, data) {
      console.log(data);
      commit('SOCKET_SET_DATA', data)
    }
  },
  mutations: {
    SET_SOCKET: (state, socket) => {
      state.socket = socket
    },
    SOCKET_SET_DATA: (state, data) => {
      state.messages.push(data) 
    }
  },
  getters: {
    SOCKET(state) {
      return state.socket
    },
    MESSAGES(state) {
      return state.messages
    }
  }
}