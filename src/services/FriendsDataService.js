import http from '../http-common'

class FriendsDataService {
  requestList() {
    return http.get('/friends/requestList')
  }

  friendList() {
    return http.get('/friends/friendList')
  }

  friends() {
    return http.get('/friends')
  }
}

export default new FriendsDataService()