import http from '../http-common'

class AuthDataService {
  login(user) {
    return http.post('/login', user)
  }

  register(user) {
    return http.post('/register', user)
  }
}

export default new AuthDataService()