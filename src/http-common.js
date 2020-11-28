import axios from 'axios';

class Http {
  request() {
      return axios.create({
          baseURL: 'http://localhost:8081/api',
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8081/api',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Authorization': localStorage.getItem('jwt')
          },
      });
  }
}

export default new Http();