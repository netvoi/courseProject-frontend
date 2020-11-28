import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8081/',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  },
});
