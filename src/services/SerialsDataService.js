import http from '../http-common'

class SerialsDataService {
  getAll() {
    return http.request().get('/serial')
  }

  get(id) {
    return http.request().get(`/serial/id${id}`)
  }

  findFirstLetter() {
    return http.request().get(`/serial/firstLetter/letter`)
  }

  findWithFirstLetter(symbol) {
    return http.request().get(`/serial/letter/${symbol}`)
  }

  filters() {
    return http.request().get('serial/filters')
  }
}

export default new SerialsDataService()
