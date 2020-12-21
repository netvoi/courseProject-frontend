import MsgDataService from '@/services/MsgDataService'
import route from '../../router'

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
    async GET_MESSAGES({commit}, dialogId) {
      console.log('dialogId', dialogId);
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
    },
    SOCKET_getMessage({commit}, data) {
      if(data.from === Number(route.currentRoute.params.id)) {
        commit('SET_MESSAGE', data)
      }
    }
  },
  mutations: {
    SET_MESSAGES: (state, messages) => {
      state.messages = messages
    },
    SET_MESSAGE: (state, data) => {
      console.log('ВЫЗВАЛСЯ МЕТОД SET_MESSAGE');
      state.messages.push(data)
    }
  },
  getters: {
    MESSAGES(state) {
      return state.messages
    }
  }
}
