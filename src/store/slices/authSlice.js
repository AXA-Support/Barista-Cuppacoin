import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../api/apiClient'
import { setAuthToken, removeAuthToken, getAuthToken, getTokenType, getEmployeeId } from '../../utils/cookies'

// Initial state
const initialState = {
  user: null,
  employee: null,
  employeeId: null,
  accessToken: null,
  tokenType: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  employeeUpdateVersion: 0, // Track employee updates to force re-renders
}

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/employee/login', {
        email: credentials.email,
        password: credentials.password,
      })

      const { access_token, token_type, employee } = response.data

      // Store token in cookies
      setAuthToken(access_token, token_type, employee)

      // Return the data
      return {
        accessToken: access_token,
        tokenType: token_type,
        employee,
        employeeId: employee?.id || null,
      }
    } catch (error) {
      // Handle error response
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
      const errorDetails = error.response?.data?.errors || {}

      return rejectWithValue({
        message: errorMessage,
        errors: errorDetails,
      })
    }
  }
)

// Async thunk for logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  removeAuthToken()
  return null
})

// Async thunk to check authentication status
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken()
      const tokenType = getTokenType()
      const employeeId = getEmployeeId()

      if (!token) {
        return rejectWithValue({ message: 'No token found' })
      }

      return {
        hasToken: true,
        accessToken: token,
        tokenType: tokenType,
        employeeId: employeeId
      }
    } catch (error) {
      removeAuthToken()
      return rejectWithValue({ message: 'Token verification failed' })
    }
  }
)

// Async thunk to fetch employee profile
export const fetchEmployeeProfile = createAsyncThunk(
  'auth/fetchEmployeeProfile',
  async (_, { rejectWithValue }) => {
    try {
      const employeeId = getEmployeeId()
      if (!employeeId) {
        throw new Error('No employee ID found')
      }

      const response = await apiClient.get(`/employees/${employeeId}`)
      return response.data
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to fetch employee profile',
      })
    }
  }
)

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearAuth: (state) => {
      state.user = null
      state.employee = null
      state.employeeId = null
      state.accessToken = null
      state.tokenType = null
      state.isAuthenticated = false
      state.error = null
    },
    setEmployeeProfile: (state, action) => {
      state.employee = action.payload
      state.user = action.payload
      state.employeeUpdateVersion = (state.employeeUpdateVersion || 0) + 1
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.accessToken = action.payload.accessToken
        state.tokenType = action.payload.tokenType
        state.employee = action.payload.employee
        state.employeeId = action.payload.employeeId
        state.user = action.payload.employee
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
        state.user = null
        state.employee = null
        state.employeeId = null
        state.accessToken = null
        state.tokenType = null
      })

      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.employee = null
        state.employeeId = null
        state.accessToken = null
        state.tokenType = null
        state.isAuthenticated = false
        state.error = null
      })

      // Check auth status cases
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.accessToken = action.payload.accessToken
        state.tokenType = action.payload.tokenType
        state.employeeId = action.payload.employeeId
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.employee = null
        state.employeeId = null
        state.accessToken = null
        state.tokenType = null
      })

      // Fetch employee profile cases
      .addCase(fetchEmployeeProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmployeeProfile.fulfilled, (state, action) => {
        state.loading = false
        state.employee = action.payload
        state.user = action.payload
        state.error = null
      })
      .addCase(fetchEmployeeProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, setUser, clearAuth, setEmployeeProfile } = authSlice.actions
export default authSlice.reducer