import DialogsDataService from '@/services/DialogsDataService'

export default {
  state: {
  },
  actions: {
    async CREATE_DIALOG({commit}) {
      const res = await DialogsDataService.createDialog()
        .then(response => response)
        .catch(error => error.response)

      console.log('CREATE_DIALOG', res);
      return res
    }
  },
  mutations: {
  },
  getters: {
  }
}