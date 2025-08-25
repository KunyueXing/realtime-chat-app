import axios from 'axios'

// Create an axios instance with default configurations
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for logging (auth will be added in store.js)
apiClient.interceptors.request.use(
  (config) => {
    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params
      })
    }

    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle responses and errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Log responses in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Response: ${response.config.method.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data
      })
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle different error scenarios
    if (error.response) {
      // Server responded with a status other than 2xx
      const { status, data } = error.response

      console.error(`API Response error: ${status}`, {
        url: originalRequest?.url,
        method: originalRequest?.method,
        message: data?.message || data || 'Unknown error'
      })

      switch (status) {
        case 404: {
          // Not Found - resource does not exist
          console.error('Resource not found: The requested resource does not exist.')
          break
        }
        case 409: {
          // Conflict - e.g., duplicate resource
          console.warn(
            'Conflict: The request could not be completed due to ',
            data?.message || 'a conflict with the current state of the resource.'
          )
          break
        }
        case 429: {
          // Too Many Requests - rate limiting
          console.warn('Too many requests: You are being rate limited. Please try again later.')
          break
        }
        case 500:
        case 502:
        case 503:
        case 504: {
          // Server errors - attempt retry for non-mutation requests
          if (originalRequest.method?.toLowerCase() === 'get' && !originalRequest._retry) {
            originalRequest._retry = true
            console.log('Gateway timeout: The server took too long to respond. Retrying request...')

            // Retry the request once
            await new Promise((resolve) => setTimeout(resolve, 1000)) // wait 1 second before retrying
            return apiClient(originalRequest)
          }
          break
        }
        default: {
          console.error('An unexpected error occurred. Please try again later.')
          break
        }
      }
    } else if (error.request) {
      // Network error - request was made but no response received
      console.error('Network error: No response received from server:', error.message)

      // Retry Get requests on network errors
      if (originalRequest.method?.toLowerCase() === 'get' && !originalRequest._retry) {
        originalRequest._retry = true
        console.log('Retrying request...')

        // Retry the request once
        await new Promise((resolve) => setTimeout(resolve, 2000)) // wait 2 second before retrying
        return apiClient(originalRequest)
      }
    } else {
      // Something else happened while setting up the request
      console.error('Error setting up request:', error.message)
    }

    return Promise.reject(error || 'Something went wrong')
  }
)

// TODO: helper function to check if online
// TODO: helper function to queue requests when offline and retry when back online

// API endpoint helpers for consistency
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  // User endpoints
  USER: {
    PROFILE: (userId) => `/user/profile/${userId}`, // GET userId is optional, if not provided, get current user's profile. PATCH to update profile
    SEARCH_USER: '/user/search',
    NON_FRIENDS: '/user/non-friends'
  },
  // Friend endpoints
  FRIEND: {
    GET_ALL_FRIENDS: '/friends',
    FRIEND_REQUEST: '/friends/requests', // POST to send request, GET to fetch requests
    ACCEPT_REQUEST: (requestId) => `/friends/requests/${requestId}/accept`,
    REJECT_REQUEST: (requestId) => `/friends/requests/${requestId}/reject`,
    REMOVE_FRIEND: (userId) => `/friends/${userId}` // DELETE
  },
  // Chat endpoints
  CHAT: {
    CHATS: '/chats', // GET to fetch all conversations, POST to create new conversation
    SEARCH_CHAT: '/chats/search',
    PIN_CHAT: (chatId) => `/chats/${chatId}/pin`, // POST to pin, DELETE to unpin
    GET_CHAT: (chatId) => `/chats/${chatId}`, // GET specific chat, DELETE to leave chat
    GET_STARRED_MESSAGES: (chatId) => `/chats/${chatId}/starred`,
    MESSAGES: (chatId) => `/chats/${chatId}/messages`, // GET to fetch messages, POST to send message
    MARK_AS_READ: (chatId) => `/chats/${chatId}/read` // POST
  },
  // Message endpoints
  MESSAGE: {
    STAR: (messageId) => `/messages/${messageId}/star`, // POST to star, DELETE to unstar
    EDIT_OR_DELETE: (messageId) => `/messages/${messageId}`, // DELETE to delete, PATCH to edit
    REPLY: (messageId) => `/messages/${messageId}/reply`, // POST to reply
    FORWARD: (messageId) => `/messages/${messageId}/forward` // POST to forward
  }
  // TODO: Notification, Media, Audio/Video Call, AI, Group endpoints
}

// Convenience methods for common API calls
export const apiMethods = {
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'GET request failed')
    }
  },
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'POST request failed')
    }
  },
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'PUT request failed')
    }
  },
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.patch(url, data, config)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'PATCH request failed')
    }
  },
  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'DELETE request failed')
    }
  }
}

export default apiClient
