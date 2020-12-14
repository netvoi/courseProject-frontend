import UsersDialogsDataService from '@/services/UsersDialogsDataService'
import UsersDataService from '@/services/UsersDataService'

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
      return res.data
    },
    async CREATE_DIALOG_BETWEEN_USERS({commit}, data) {
      const res = await UsersDialogsDataService.createDialogBetweenUsers(data)
        .then(response => response)
        .catch(error => error.response)

      return res
    },
    async GET_ALL_DIALOGS({commit}) {
      const res = await UsersDialogsDataService.getDialogs()
        .then(response => response)
        .catch(error => error.response)

      const dialogsId = res.data.dialogs.map(item => item.users_id)

      const users = await UsersDataService.getAllById({ id: dialogsId })
        .then(response => response)
        .catch(error => error.response)

      commit('SET_ALL_DIALOGS', users.data)
      return res
    },
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
