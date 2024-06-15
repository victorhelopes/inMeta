import axios from 'axios'

import { getToken } from './helpers/tokenHelper'

const api = axios.create({
  baseURL: 'https://cards-marketplace-api.onrender.com'
})

api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
