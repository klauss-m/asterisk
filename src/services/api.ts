import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  headers: { 'Access-Control-Allow-Origin': '*' },
})

export default api
