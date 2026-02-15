import apiClient from './apiClient'
import { getEmployeeId } from '../../utils/cookies'

export const quizApi = {
    // Get quizzes for an employee
    getEmployeeQuizzes: async (employeeId) => {
        const response = await apiClient.get(`/quiz-assignments/employee/${employeeId}/quizzes`)
        return response.data
    },

    // Get quizzes for current employee (using ID from cookies)
    getCurrentEmployeeQuizzes: async () => {
        const employeeId = getEmployeeId()
        if (!employeeId || employeeId === 'null') {
            throw new Error('No employee ID found in cookies')
        }
        return await quizApi.getEmployeeQuizzes(employeeId)
    },

    // Get quiz details with questions by quiz ID
    getQuizDetails: async (quizId) => {
        const response = await apiClient.get(`/quizzes/${quizId}`)
        return response.data
    },

    // Start a quiz attempt
    startAttempt: async (assignmentId) => {
        const response = await apiClient.post(`/quiz-attempts/assignments/${assignmentId}/start`)
        return response.data
    },

    // Submit quiz answers
    submitAttempt: async (attemptId, answers) => {
        const response = await apiClient.post(`/quiz-attempts/${attemptId}/submit`, {
            answers: answers
        })
        return response.data
    },

    // Get quiz attempts for an employee
    getQuizAttempts: async (employeeId, quizId) => {
        const response = await apiClient.get(`/quizzes/employees/${employeeId}/quizzes/${quizId}/attempts`)
        return response.data
    },

    // Get quiz statistics for an employee
    getQuizStatistics: async (employeeId) => {
        const response = await apiClient.get(`/quizzes/employees/${employeeId}/quiz-statistics`)
        return response.data
    },

    // Get unattempted quiz notifications for an employee
    getUnattemptedNotifications: async (employeeId) => {
        const response = await apiClient.get(`/quiz-assignments/employee/${employeeId}/unattempted-notifications`)
        return response.data
    },

    // Get unattempted quiz notifications for current employee
    getCurrentEmployeeUnattemptedNotifications: async () => {
        const employeeId = getEmployeeId()
        if (!employeeId || employeeId === 'null') {
            throw new Error('No employee ID found in cookies')
        }
        return await quizApi.getUnattemptedNotifications(employeeId)
    },
}
