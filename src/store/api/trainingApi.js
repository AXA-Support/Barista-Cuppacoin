import apiClient from './apiClient'

// Training API methods
export const trainingAPI = {
    // CRUD operations
    getAll: async (params = {}) => {
        const response = await apiClient.get('/trainings', { params })
        return response
    },
    
    getById: async (trainingId) => {
        const response = await apiClient.get(`/trainings/${trainingId}`)
        return response
    },
    
    create: async (trainingData) => {
        const response = await apiClient.post('/trainings', trainingData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response
    },
    
    update: async (trainingId, trainingData) => {
        const response = await apiClient.put(`/trainings/${trainingId}`, trainingData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response
    },
    
    delete: async (trainingId) => {
        const response = await apiClient.delete(`/trainings/${trainingId}`)
        return response
    },

    // Additional operations
    download: async (trainingId) => {
        const response = await apiClient.get(`/trainings/${trainingId}/download`, {
            responseType: 'blob',
        })
        return response
    },
    
    toggleActive: async (trainingId) => {
        const response = await apiClient.post(`/trainings/${trainingId}/toggle-active`)
        return response
    },
    
    getByOwner: async (ownerId) => {
        const response = await apiClient.get(`/trainings/owner/${ownerId}`)
        return response
    },
    
    getByStore: async (storeId) => {
        const response = await apiClient.get(`/trainings/store/${storeId}`)
        return response
    },
    
    getByEmployee: async (employeeId) => {
        const response = await apiClient.get(`/trainings/employee/${employeeId}`)
        return response
    },
    
    getStatistics: async (ownerId) => {
        const response = await apiClient.get(`/trainings/owner/${ownerId}/statistics`)
        return response
    },

    // Get file URL (helper method)
    getFileUrl: (filePath) => {
        // Assuming your backend serves files from /storage URL
        const baseUrl = import.meta.env.VITE_API_BASE_URL 
            ? import.meta.env.VITE_API_BASE_URL.replace('/api', '')
            : 'http://127.0.0.1:8000'
        return `${baseUrl}/storage/${filePath}`
    }
}
