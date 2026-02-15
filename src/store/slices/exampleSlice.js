/**
 * EXAMPLE SLICE - This file demonstrates how to create new API slices
 * 
 * To create a new API slice:
 * 1. Copy this file and rename it (e.g., userSlice.js, dataSlice.js)
 * 2. Update the slice name, initial state, and async thunks
 * 3. Add the reducer to store/index.js
 * 4. Use the slice in your components with useSelector and useDispatch
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../api/apiClient'

// Initial state
const initialState = {
  data: null,
  loading: false,
  error: null,
}

// Example: GET request async thunk
export const fetchExampleData = createAsyncThunk(
  'example/fetchExampleData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/example-endpoint', {
        params, // Query parameters
      })
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch data'
      return rejectWithValue({ message: errorMessage })
    }
  }
)

// Example: POST request async thunk
export const createExampleData = createAsyncThunk(
  'example/createExampleData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/example-endpoint', data)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create data'
      return rejectWithValue({ message: errorMessage })
    }
  }
)

// Example: PUT/PATCH request async thunk
export const updateExampleData = createAsyncThunk(
  'example/updateExampleData',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/example-endpoint/${id}`, data)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update data'
      return rejectWithValue({ message: errorMessage })
    }
  }
)

// Example: DELETE request async thunk
export const deleteExampleData = createAsyncThunk(
  'example/deleteExampleData',
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/example-endpoint/${id}`)
      return id
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete data'
      return rejectWithValue({ message: errorMessage })
    }
  }
)

// Slice
const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    resetState: (state) => {
      state.data = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch data cases
    builder
      .addCase(fetchExampleData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchExampleData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchExampleData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create data cases
      .addCase(createExampleData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createExampleData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(createExampleData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update data cases
      .addCase(updateExampleData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateExampleData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(updateExampleData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Delete data cases
      .addCase(deleteExampleData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteExampleData.fulfilled, (state, action) => {
        state.loading = false
        // Remove deleted item from state if needed
        state.error = null
      })
      .addCase(deleteExampleData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, resetState } = exampleSlice.actions
export default exampleSlice.reducer

/**
 * USAGE IN COMPONENT:
 * 
 * import { useSelector, useDispatch } from 'react-redux'
 * import { fetchExampleData, clearError } from '../store/slices/exampleSlice'
 * 
 * function MyComponent() {
 *   const dispatch = useDispatch()
 *   const { data, loading, error } = useSelector((state) => state.example)
 * 
 *   useEffect(() => {
 *     dispatch(fetchExampleData({ param: 'value' }))
 *   }, [dispatch])
 * 
 *   if (loading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error.message}</div>
 * 
 *   return <div>{/* render data *\/}</div>
 * }
 */

