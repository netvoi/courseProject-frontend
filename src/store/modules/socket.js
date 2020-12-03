export default {
  state: {
  },
  actions: {
    GET_SOCKET({commit}, socket) {
    },
    SOCKET_GET_DATA({commit}, data) {
    },
    SOCKET_customEmit({commit}, data, cb) {
      console.log(data)
    }
  },
  mutations: {
    SET_SOCKET: (state, socket) => {
    },
    SOCKET_SET_DATA: (state, data) => {
    }
  },
  getters: {
    SOCKET(state) {
    },
    MESSAGES(state) {
    }
  }
}