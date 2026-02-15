import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trainingAPI } from '../api/trainingApi';
import { toast } from 'sonner';

export const fetchTrainings = createAsyncThunk(
    'training/fetchTrainings',
    async ({employeeId, params = {} } = {}, { rejectWithValue }) => {
        try {
            let response;
            if (employeeId) {
                response = await trainingAPI.getByEmployee(employeeId);
            } else {
                response = await trainingAPI.getAll(params);
            }

            // Extract data properly from API response
            // Employee endpoint structure: { success: true, data: { current_page, data: [...], ... }, employee: {...}, message: "..." }
            let trainingsData = [];
            let pagination = null;
            
            // Method 1: If response.data.data.data exists (employee endpoint structure: /trainings/employee/{id})
            if (response.data && response.data.data && response.data.data.data && Array.isArray(response.data.data.data)) {
                trainingsData = response.data.data.data;
                pagination = {
                    current_page: response.data.data.current_page,
                    last_page: response.data.data.last_page,
                    per_page: response.data.data.per_page,
                    total: response.data.data.total,
                    ...response.data.data
                };
            }
            // Method 2: If response.data.data is the array (standard structure)
            else if (response.data && response.data.data && Array.isArray(response.data.data)) {
                trainingsData = response.data.data;
                pagination = response.data.meta || response.data.pagination || null;
            }
            // Method 3: Fallback - if response.data is the array
            else if (response.data && Array.isArray(response.data)) {
                trainingsData = response.data;
            }

            return {
                data: trainingsData,
                pagination: pagination,
                employee: response.data?.employee || null
            };
        } catch (error) {
            console.error('Fetch trainings error:', error);
            return rejectWithValue(error.message || 'Failed to fetch trainings');
        }
    }
);

// Async thunk for creating a training
export const createTraining = createAsyncThunk(
    'training/createTraining',
    async (trainingData, { rejectWithValue }) => {
        try {
            const response = await trainingAPI.create(trainingData);
            toast.success('Training uploaded successfully!');
            return {
                data: response.data.data || response.data
            };
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Failed to upload training';
            toast.error(errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
);

// Async thunk for updating a training
export const updateTraining = createAsyncThunk(
    'training/updateTraining',
    async ({ trainingId, trainingData }, { rejectWithValue }) => {
        try {
            const response = await trainingAPI.update(trainingId, trainingData);
            toast.success('Training updated successfully!');
            return {
                data: response.data.data || response.data
            };
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Failed to update training';
            toast.error(errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
);

// Async thunk for deleting a training
export const deleteTraining = createAsyncThunk(
    'training/deleteTraining',
    async (trainingId, { rejectWithValue }) => {
        try {
            await trainingAPI.delete(trainingId);
            toast.success('Training deleted successfully!');
            return trainingId;
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Failed to delete training';
            toast.error(errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
);

// Async thunk for toggling active status
export const toggleTrainingActive = createAsyncThunk(
    'training/toggleActive',
    async (trainingId, { rejectWithValue }) => {
        try {
            const response = await trainingAPI.toggleActive(trainingId);
            return {
                data: response.data.data || response.data
            };
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Failed to update status';
            toast.error(errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
);

// Async thunk for downloading a training file
export const downloadTraining = createAsyncThunk(
    'training/download',
    async (trainingId, { rejectWithValue }) => {
        try {
            const response = await trainingAPI.download(trainingId);
            return { trainingId, blob: response.data };
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Failed to download file';
            toast.error(errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
);

// Async thunk for fetching training statistics
export const fetchTrainingStatistics = createAsyncThunk(
    'training/fetchStatistics',
    async (ownerId, { rejectWithValue }) => {
        try {
            const response = await trainingAPI.getStatistics(ownerId);
            return {
                data: response.data.data || response.data,
                pagination: response.data.meta || response.data.pagination || null
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Failed to fetch statistics'
            );
        }
    }
);

const trainingSlice = createSlice({
    name: 'training',
    initialState: {
        trainings: [],
        currentTraining: null,
        loading: false,
        error: null,
        createStatus: 'idle',
        updateStatus: 'idle',
        deleteStatus: 'idle',
        statistics: null,
        statisticsLoading: false,
        statisticsError: null,
        pagination: null,
        fileViewer: {
            isOpen: false,
            fileUrl: null,
            fileType: null,
            fileName: null
        }
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetStatus: (state) => {
            state.createStatus = 'idle';
            state.updateStatus = 'idle';
            state.deleteStatus = 'idle';
        },
        setCurrentTraining: (state, action) => {
            state.currentTraining = action.payload;
        },
        clearTrainings: (state) => {
            state.trainings = [];
            state.pagination = null;
        },
        openFileViewer: (state, action) => {
            const { fileUrl, fileType, fileName } = action.payload;
            state.fileViewer = {
                isOpen: true,
                fileUrl,
                fileType,
                fileName
            };
        },
        closeFileViewer: (state) => {
            state.fileViewer = {
                isOpen: false,
                fileUrl: null,
                fileType: null,
                fileName: null
            };
        },
        updateTrainingsLocally: (state, action) => {
            const updatedTraining = action.payload;
            state.trainings = state.trainings.map(training =>
                training.id === updatedTraining.id ? updatedTraining : training
            );
        },
        addTrainingLocally: (state, action) => {
            state.trainings.unshift(action.payload);
        },
        removeTrainingLocally: (state, action) => {
            state.trainings = state.trainings.filter(training => training.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch trainings
            .addCase(fetchTrainings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrainings.fulfilled, (state, action) => {
                state.loading = false;
                state.trainings = action.payload.data || [];
                state.pagination = action.payload.pagination;
                state.error = null;
            })
            .addCase(fetchTrainings.rejected, (state, action) => {
                state.loading = false;
                state.error = String(action.payload || 'Unknown error occurred');
                toast.error(state.error);
            })
            // Create training
            .addCase(createTraining.pending, (state) => {
                state.createStatus = 'loading';
                state.error = null;
            })
            .addCase(createTraining.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.trainings.unshift(action.payload.data);
                state.error = null;
            })
            .addCase(createTraining.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.error = String(action.payload || 'Unknown error occurred');
            })
            // Update training
            .addCase(updateTraining.pending, (state) => {
                state.updateStatus = 'loading';
                state.error = null;
            })
            .addCase(updateTraining.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const updatedTraining = action.payload.data;
                const index = state.trainings.findIndex(t => t.id === updatedTraining.id);
                if (index !== -1) {
                    state.trainings[index] = updatedTraining;
                }
                state.error = null;
            })
            .addCase(updateTraining.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = String(action.payload || 'Unknown error occurred');
            })
            // Delete training
            .addCase(deleteTraining.pending, (state) => {
                state.deleteStatus = 'loading';
                state.error = null;
            })
            .addCase(deleteTraining.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.trainings = state.trainings.filter(training => training.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteTraining.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = String(action.payload || 'Unknown error occurred');
            })
            // Toggle active status
            .addCase(toggleTrainingActive.fulfilled, (state, action) => {
                const updatedTraining = action.payload.data;
                const index = state.trainings.findIndex(t => t.id === updatedTraining.id);
                if (index !== -1) {
                    state.trainings[index] = updatedTraining;
                }
            })
            // Fetch statistics
            .addCase(fetchTrainingStatistics.pending, (state) => {
                state.statisticsLoading = true;
                state.statisticsError = null;
            })
            .addCase(fetchTrainingStatistics.fulfilled, (state, action) => {
                state.statisticsLoading = false;
                state.statistics = action.payload.data;
                state.statisticsError = null;
            })
            .addCase(fetchTrainingStatistics.rejected, (state, action) => {
                state.statisticsLoading = false;
                state.statisticsError = String(action.payload || 'Unknown error occurred');
                toast.error(state.statisticsError);
            });
    },
});

export const {
    clearError,
    resetStatus,
    setCurrentTraining,
    clearTrainings,
    openFileViewer,
    closeFileViewer,
    updateTrainingsLocally,
    addTrainingLocally,
    removeTrainingLocally
} = trainingSlice.actions;
export default trainingSlice.reducer;