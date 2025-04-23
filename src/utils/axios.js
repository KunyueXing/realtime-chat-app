import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000'
})

// Add a request interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
)

export default axiosInstance
