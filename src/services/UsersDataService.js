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

  updateData(data) {
    return http.request().put('/user/updData', data)
  }

  updatePassword(password) {
    return http.request().put('/user/updPassword', password)
  }
}

export default new UsersDataService()
