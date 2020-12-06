import http from '../http-common'

class UsersDialogsDataService {
  isExist(assigneeId) {
    return http.request().post(`/users_dialogs/isExist`, assigneeId)
  }

  createDialogBetweenUsers(data) {
    return http.request().post(`/users_dialogs`, data)
  }

  getDialogs() {
    return http.request().get('/users_dialogs/getDialogs')
  }
}

export default new UsersDialogsDataService()