import axios from 'axios'

const api = axios.create({
  baseURL: 'https://18.228.7.152:3333/',
})

export default api
