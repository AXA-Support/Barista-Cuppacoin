import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { overviewApi } from '../api/overviewApi'

// Initial state
const initialState = {
  overviewData: null,
  loading: false,
  error: null,
}

// Async thunk to fetch employee overview/summary
export const fetchEmployeeOverview = createAsyncThunk(
  'overview/fetchEmployeeOverview',
  async (employeeId, { rejectWithValue }) => {
    try {
      const data = await overviewApi.getEmployeeSummary(employeeId)
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to fetch overview data'
      return rejectWithValue({
        message: errorMessage,
      })
    }
  }
)

// Overview slice
const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {
    clearOverview: (state) => {
      state.overviewData = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch employee overview cases
      .addCase(fetchEmployeeOverview.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmployeeOverview.fulfilled, (state, action) => {
        state.loading = false
        state.overviewData = action.payload
        state.error = null
      })
      .addCase(fetchEmployeeOverview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.overviewData = null
      })
  },
})

export const { clearOverview } = overviewSlice.actions
export default overviewSlice.reducer
