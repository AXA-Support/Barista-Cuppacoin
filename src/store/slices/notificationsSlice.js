import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { quizApi } from '../api/quizApi'

// Initial state
const initialState = {
  notifications: [],
  summary: {
    total_employees: 0,
    total_unattempted_assignments: 0,
    total_overdue: 0,
    total_due_soon: 0,
    total_pending: 0,
  },
  employeeData: null,
  loading: false,
  error: null,
}

// Async thunk to fetch unattempted quiz notifications
export const fetchUnattemptedNotifications = createAsyncThunk(
  'notifications/fetchUnattemptedNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const data = await quizApi.getCurrentEmployeeUnattemptedNotifications()
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch notifications'
      return rejectWithValue({
        message: errorMessage,
      })
    }
  }
)

// Notifications slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearNotifications: (state) => {
      state.notifications = []
      state.summary = initialState.summary
      state.employeeData = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications cases
      .addCase(fetchUnattemptedNotifications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUnattemptedNotifications.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.success && action.payload.data && action.payload.data.length > 0) {
          // Extract data from the first employee data object
          const employeeData = action.payload.data[0]
          state.employeeData = employeeData
          state.notifications = employeeData.quizzes || []
          state.summary = action.payload.summary || initialState.summary
        } else {
          state.notifications = []
          state.employeeData = null
          state.summary = initialState.summary
        }
        state.error = null
      })
      .addCase(fetchUnattemptedNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.notifications = []
        state.employeeData = null
        state.summary = initialState.summary
      })
  },
})

export const { clearError, clearNotifications } = notificationsSlice.actions
export default notificationsSlice.reducer
