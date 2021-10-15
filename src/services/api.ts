import axios from 'axios'

const api = axios.create({
  baseURL: 'http://18.228.7.152:3333/',
  // baseURL: 'https://huepi.herokuapp.com/',
})

export default api
