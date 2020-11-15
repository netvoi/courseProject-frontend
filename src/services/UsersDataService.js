import http from '../http-common'

class UsersDataService {
  getAll() {
    return http.get('/user')
  }

  get(id) {
    return http.get(`/user/id${id}`)
  }

  authUser() {
    return http.get('user/me')
  }

  someUsers(users) {
    return http.post('/user/someUsers', users)
  }
}

export default new UsersDataService()
