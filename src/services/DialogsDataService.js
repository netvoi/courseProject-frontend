import http from '../http-common'

class DialogsDataService {
  createDialog() {
    return http.request().get('/dialogs/createDialog')
  }
}

export default new DialogsDataService()