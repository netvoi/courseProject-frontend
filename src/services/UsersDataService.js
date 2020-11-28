import http from '../http-common'

class UsersDataService {
  getAll() {
    return http.request().get('/user')
  }

  get(id) {
    return http.request().get(`/user/id${id}`)
  }

  authUser() {
    return http.request().get('user/me')
  }

  someUsers(users) {
    return http.request().post('/user/someUsers', users)
  }
}

export default new UsersDataService()
