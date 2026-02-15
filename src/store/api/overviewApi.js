import apiClient from './apiClient'
import { getEmployeeId } from '../../utils/cookies'

export const overviewApi = {
    // Get employee summary/overview
    getEmployeeSummary: async (employeeId) => {
        const response = await apiClient.get(`/employees/${employeeId}/calculate-summary`)
        return response.data
    },

    // Get current employee summary (using ID from cookies)
    getCurrentEmployeeSummary: async () => {
        const employeeId = getEmployeeId()
        if (!employeeId || employeeId === 'null') {
            throw new Error('No employee ID found in cookies')
        }
        return await overviewApi.getEmployeeSummary(employeeId)
    },
}
