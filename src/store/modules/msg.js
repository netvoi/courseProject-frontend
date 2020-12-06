import MsgDataService from '@/services/MsgDataService'

export default {
  state: {
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
    }
  },
  mutations: {
  },
  getters: {
  }
}