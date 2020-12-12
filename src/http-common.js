import axios from 'axios'
import router from './router'
import store from './store'

class Http {
  request() {
    const instance = axios.create({
      baseURL: 'http://localhost:8081/api',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8081/api',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Authorization': localStorage.getItem('jwt')
      },
    })
    instance.interceptors.response.use(
      response => response,
      async error => {
        console.log(error.response.status)
        if(error.response.status === 401) {
          await store.dispatch('LOGOUT')
          router.push('/auth')
          return
        }
        return Promise.reject(error);
    })

    return instance
  }
}

export default new Http()