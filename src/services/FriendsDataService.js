import http from '../http-common'

class FriendsDataService {
  myFriendLists() {
    return http.request().get(`/friends`)
  }

  friendList(id) {
    return http.request().get(`/friends/id${ id }`)
  }

  sendRequest(id) {
    return http.request().post(`/friends/requestList/sendRequest`, id)
  }

  confirmRequest(id) {
    return http.request().post(`/friends/requestList/confirm`, id)
  }

  cancelRequest(id) {
    return http.request().post(`/friends/requestList/cancel`, id)
  }
}

export default new FriendsDataService()