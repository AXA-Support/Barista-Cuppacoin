import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { quizApi } from '../api/quizApi'

// Initial state
const initialState = {
  currentQuizzes: [],
  pastQuizzes: [],
  counts: {
    current: {
      total: 0,
      not_attempted: 0,
      in_progress: 0,
      completed: 0,
      passed: 0,
      failed: 0,
      expiring_soon: 0,
    },
    past: {
      total: 0,
      passed: 0,
      failed: 0,
      expired: 0,
      no_attempts_left: 0,
    },
    overall: {
      total_quizzes_assigned: 0,
      current_quizzes: 0,
      past_quizzes: 0,
      completion_rate: 0,
      success_rate: 0,
      average_score: 0,
    },
  },
  summary: {
    total_current: 0,
    total_past: 0,
    total_assigned: 0,
    urgent_quizzes: 0,
    in_progress: 0,
  },
  employeeId: null,
  loading: false,
  error: null,
  // Quiz details state
  currentQuiz: null,
  quizQuestions: [],
  quizLoading: false,
  quizError: null,
  // Quiz attempt state
  currentAttempt: null,
  attemptLoading: false,
  attemptError: null,
  submitLoading: false,
  submitError: null,
  submitResult: null,
  // Quiz attempts state
  quizAttempts: null,
  attemptsLoading: false,
  attemptsError: null,
  // Quiz statistics state
  quizStatistics: null,
  statisticsLoading: false,
  statisticsError: null,
}

// Async thunk to fetch employee quizzes
export const fetchEmployeeQuizzes = createAsyncThunk(
  'quiz/fetchEmployeeQuizzes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await quizApi.getCurrentEmployeeQuizzes()
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch quizzes'
      return rejectWithValue({
        message: errorMessage,
      })
    }
  }
)

// Async thunk to fetch quiz details with questions
export const fetchQuizDetails = createAsyncThunk(
  'quiz/fetchQuizDetails',
  async (quizId, { rejectWithValue }) => {
    try {
      const data = await quizApi.getQuizDetails(quizId)
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch quiz details'
      return rejectWithValue({
        message: errorMessage,
      })
    }
  }
)

// Async thunk to start a quiz attempt
export const startQuizAttempt = createAsyncThunk(
  'quiz/startQuizAttempt',
  async (assignmentId, { rejectWithValue }) => {
    try {
      const data = await quizApi.startAttempt(assignmentId)
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to start quiz attempt'
      return rejectWithValue({
        message: errorMessage,
      })
    }
  }
)

// Async thunk to submit quiz answers
export const submitQuizAttempt = createAsyncThunk(
  'quiz/submitQuizAttempt',
  async ({ attemptId, answers }, { rejectWithValue }) => {
    try {
      const data = await quizApi.submitAttempt(attemptId, answers)
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to submit quiz'
      return rejectWithValue({
        message: errorMessage,
      })
    }
  }
)

// Async thunk to fetch quiz attempts
export const fetchQuizAttempts = createAsyncThunk(
  'quiz/fetchQuizAttempts',
  async ({ employeeId, quizId }, { rejectWithValue }) => {
    try {
      const data = await quizApi.getQuizAttempts(employeeId, quizId)
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to fetch quiz attempts'
      return rejectWithValue({
        message: errorMessage,
      })
    }
  }
)

// Async thunk to fetch quiz statistics
export const fetchQuizStatistics = createAsyncThunk(
  'quiz/fetchQuizStatistics',
  async (employeeId, { rejectWithValue }) => {
    try {
      const data = await quizApi.getQuizStatistics(employeeId)
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to fetch quiz statistics'
      return rejectWithValue({
        message: errorMessage,
      })
    }
  }
)

// Quiz slice
const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearQuizzes: (state) => {
      state.currentQuizzes = []
      state.pastQuizzes = []
      state.counts = initialState.counts
      state.summary = initialState.summary
      state.employeeId = null
      state.error = null
    },
    clearQuizDetails: (state) => {
      state.currentQuiz = null
      state.quizQuestions = []
      state.quizError = null
    },
    clearAttempt: (state) => {
      state.currentAttempt = null
      state.attemptError = null
      state.submitResult = null
      state.submitError = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch employee quizzes cases
      .addCase(fetchEmployeeQuizzes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmployeeQuizzes.fulfilled, (state, action) => {
        state.loading = false
        state.currentQuizzes = action.payload.current_quizzes || []
        state.pastQuizzes = action.payload.past_quizzes || []
        state.counts = action.payload.counts || initialState.counts
        state.summary = action.payload.summary || initialState.summary
        state.employeeId = action.payload.employee_id || null
        state.error = null
      })
      .addCase(fetchEmployeeQuizzes.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.currentQuizzes = []
        state.pastQuizzes = []
        state.counts = initialState.counts
        state.summary = initialState.summary
      })
      // Fetch quiz details cases
      .addCase(fetchQuizDetails.pending, (state) => {
        state.quizLoading = true
        state.quizError = null
      })
      .addCase(fetchQuizDetails.fulfilled, (state, action) => {
        state.quizLoading = false
        state.currentQuiz = action.payload.quiz || null
        state.quizQuestions = action.payload.questions || []
        state.quizError = null
      })
      .addCase(fetchQuizDetails.rejected, (state, action) => {
        state.quizLoading = false
        state.quizError = action.payload
        state.currentQuiz = null
        state.quizQuestions = []
      })
      // Start quiz attempt cases
      .addCase(startQuizAttempt.pending, (state) => {
        state.attemptLoading = true
        state.attemptError = null
      })
      .addCase(startQuizAttempt.fulfilled, (state, action) => {
        state.attemptLoading = false
        state.currentAttempt = action.payload.attempt || null
        state.currentQuiz = action.payload.quiz || state.currentQuiz
        state.quizQuestions = action.payload.quiz?.questions || state.quizQuestions
        state.attemptError = null
      })
      .addCase(startQuizAttempt.rejected, (state, action) => {
        state.attemptLoading = false
        state.attemptError = action.payload
        state.currentAttempt = null
      })
      // Submit quiz attempt cases
      .addCase(submitQuizAttempt.pending, (state) => {
        state.submitLoading = true
        state.submitError = null
      })
      .addCase(submitQuizAttempt.fulfilled, (state, action) => {
        state.submitLoading = false
        state.submitResult = action.payload
        state.currentAttempt = action.payload.attempt || state.currentAttempt
        state.submitError = null
      })
      .addCase(submitQuizAttempt.rejected, (state, action) => {
        state.submitLoading = false
        state.submitError = action.payload
        state.submitResult = null
      })
      // Fetch quiz attempts cases
      .addCase(fetchQuizAttempts.pending, (state) => {
        state.attemptsLoading = true
        state.attemptsError = null
      })
      .addCase(fetchQuizAttempts.fulfilled, (state, action) => {
        state.attemptsLoading = false
        state.quizAttempts = action.payload
        state.attemptsError = null
      })
      .addCase(fetchQuizAttempts.rejected, (state, action) => {
        state.attemptsLoading = false
        state.attemptsError = action.payload
        state.quizAttempts = null
      })
      // Fetch quiz statistics cases
      .addCase(fetchQuizStatistics.pending, (state) => {
        state.statisticsLoading = true
        state.statisticsError = null
      })
      .addCase(fetchQuizStatistics.fulfilled, (state, action) => {
        state.statisticsLoading = false
        state.quizStatistics = action.payload
        state.statisticsError = null
      })
      .addCase(fetchQuizStatistics.rejected, (state, action) => {
        state.statisticsLoading = false
        state.statisticsError = action.payload
        state.quizStatistics = null
      })
  },
})

export const { clearError, clearQuizzes, clearQuizDetails, clearAttempt } = quizSlice.actions
export default quizSlice.reducer
