import http from '../http-auth'

class AuthDataService {
  login(user) {
    return http.post('/login', user)
  }

  register(user) {
    return http.post('/register', user)
  }
}

export default new AuthDataService()