import axios from 'axios'
import { getAuthToken, getTokenType, removeAuthToken } from '../../utils/cookies'

// Base API URL - can be moved to environment variables
// const BASE_URL = 'http://127.0.0.1:8000/api'

const BASE_URL = 'https://backend.cuppacoin.com/api'

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    const tokenType = getTokenType()
    
    if (token) {
      config.headers.Authorization = `${tokenType} ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      removeAuthToken()
      // Optionally dispatch logout action here if needed
      window.location.href = '/'
    }
    
    return Promise.reject(error)
  }
)

export default apiClient

