import axios from 'axios'

const api = axios.create({
  baseURL: 'https://asteriskapi.herokuapp.com/',
  headers: { 'Access-Control-Allow-Origin': '*' },
})

export default api
