import UsersDialogsDataService from '@/services/UsersDialogsDataService'

export default {
  state: {
    idDialogExist: false,
    dialogId: null,
    allDialogs: []
  },
  actions: {
    async IS_DIALOG_EXIST({commit}, assigneeId) {
      const res = await UsersDialogsDataService.isExist(assigneeId)
        .then(response => response)
        .catch(error => error.response)

      commit('STATUS_DIALOG_EXIST', res.data)
      console.log('IS_DIALOG_EXIST', res);
      return res.data
    },
    async CREATE_DIALOG_BETWEEN_USERS({commit}, data) {
      const res = await UsersDialogsDataService.createDialogBetweenUsers(data)
        .then(response => response)
        .catch(error => error.response)

      console.log('CREATE_DIALOG_BETWEEN_USERS', res);
      return res
    },
    async GET_ALL_DIALOGS({commit}) {
      const res = await UsersDialogsDataService.getDialogs()
        .then(response => response)
        .catch(error => error.response)

      commit('SET_ALL_DIALOGS', res.data.dialogs)
      console.log(res);
      return res
    }
  },
  mutations: {
    STATUS_DIALOG_EXIST: (state, data) => {
      if(data.isExist) {
        state.idDialogExist = data.isExist
        state.dialogId = data.dialogsId
      } else {
        state.idDialogExist = data.isExist
      }
    },
    SET_ALL_DIALOGS: (state, dialogs) => {
      state.allDialogs = dialogs
    }
  },
  getters: {
    DIALOG_EXIST(state) {
      return state.idDialogExist
    },
    DIALOG_ID(state) {
      return state.dialogId
    },
    ALL_DIALOGS(state) {
      return state.allDialogs
    }
  }
}