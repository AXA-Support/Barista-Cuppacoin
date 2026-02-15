import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import quizReducer from './slices/quizSlice'
import overviewReducer from './slices/overviewSlice'
import trainingReducer from './slices/trainingSlice'
import notificationsReducer from './slices/notificationsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    overview: overviewReducer,
    training: trainingReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/loginUser/fulfilled'],
      },
    }),
})

