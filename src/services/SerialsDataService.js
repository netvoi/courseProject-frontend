import http from '../http-common'

class SerialsDataService {
  getAll() {
    return http.get('/serial')
  }

  get(id) {
    return http.get(`/serial/id${id}`)
  }

  findFirstLetter() {
    return http.get(`/serial/firstLetter/letter`)
  }

  findWithFirstLetter(symbol) {
    return http.get(`/serial/letter/${symbol}`)
  }

  filters() {
    return http.get('serial/filters')
  }
}

export default new SerialsDataService()
