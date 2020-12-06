import http from '../http-common'

class MsgDataService {
  createMsg(data) {
    return http.request().post('/msg/create', data)
  }
}

export default new MsgDataService()