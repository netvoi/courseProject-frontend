import MsgDataService from '@/services/MsgDataService'

export default {
  state: {
    messages: []
  },
  actions: {
    async CREATE_MESSAGE({commit}, data) {
      const res = await MsgDataService.createMsg({
        dialogsId: data.dialogsId,
        text: data.text
      })
        .then(response => response)
        .catch(error => error.response)

      console.log('CREATE_MESSAGE', res);
      return res
    },
    SOCKET_GET_MESSAGE({commit}, data) {
      console.log('socket data', data);
      commit('SET_MESSAGE', data)
    },
    async GET_MESSAGES({commit}, dialogId) {
      const res = await MsgDataService.getMessage(dialogId)
        .then(response => response)
        .catch(error => error.response)

      const messages = res.data.messages.map(item => {
        return {
          message: item.text_msg,
          from: item.users_id,
          created: item.created
        }
      })

      commit('SET_MESSAGES', messages)
      return res
    }
  },
  mutations: {
    SET_MESSAGE: (state, data) => {
      state.messages.push(data)
    },
    SET_MESSAGES: (state, messages) => {
      state.messages = messages
    }
  },
  getters: {
    MESSAGES(state) {
      return state.messages
    }
  }
}