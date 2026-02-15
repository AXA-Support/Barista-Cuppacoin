import apiClient from './apiClient'
import { getEmployeeId } from '../../utils/cookies'

export const employeeApi = {
    // Get employee by ID
    getEmployeeById: async (employeeId) => {
        const response = await apiClient.get(`/employees/${employeeId}`)
        return response.data
    },

    // Update employee
    updateEmployee: async (employeeId, employeeData) => {
        const response = await apiClient.post(`/employees/${employeeId}`, employeeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    },

    // Get current employee (using ID from cookies)
    getCurrentEmployee: async () => {
        const employeeId = getEmployeeId()
        if (!employeeId) {
            throw new Error('No employee ID found in cookies')
        }
        return await employeeApi.getEmployeeById(employeeId)
    },

    // Update current employee profile
    updateCurrentEmployeeProfile: async (profileData) => {
        const employeeId = getEmployeeId()
        if (!employeeId) {
            throw new Error('No employee ID found in cookies')
        }

        // Create FormData for file upload
        const formData = new FormData()

        // Helper function to append data to FormData
        const appendToFormData = (key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                formData.append(key, value)
            }
        }

        // Append basic fields
        const nameParts = profileData.name?.split(' ') || []
        appendToFormData('first_name', nameParts[0] || '')
        appendToFormData('last_name', nameParts.slice(1).join(' ') || '')
        appendToFormData('email', profileData.email)
        appendToFormData('phone', profileData.phone || null)

        // Only append password if it was changed (not the masked value)
        if (profileData.password && profileData.password !== '*********') {
            appendToFormData('password', profileData.password)
        }

        // Handle image upload
        if (profileData.image && typeof profileData.image === 'string' && profileData.image.startsWith('data:image')) {
            try {
                // Convert base64 to blob
                const base64Response = await fetch(profileData.image)
                const blob = await base64Response.blob()
                formData.append('image', blob, 'profile.jpg')
            } catch (error) {
                console.error('Error converting image:', error)
            }
        } else if (profileData.image instanceof File) {
            formData.append('image', profileData.image)
        }

        await employeeApi.updateEmployee(employeeId, formData)
        
        // Fetch the updated employee data to get the latest image and all fields
        return await employeeApi.getEmployeeById(employeeId)
    }
}