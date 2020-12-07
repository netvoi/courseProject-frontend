import http from '../http-common'

class MsgDataService {
  createMsg(data) {
    return http.request().post('/msg/create', data)
  }
  
  getMessage(dialogId) {
    return http.request().post('/msg', dialogId)
  }
}

export default new MsgDataService()