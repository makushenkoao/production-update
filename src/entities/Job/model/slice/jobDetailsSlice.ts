import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobDetailsSchema } from '../types/jobDetailsSchema';
import { Job } from '../../model/types/job';
import { getJobDetailsService } from '../../model/services/getJobDetailsService/getJobDetailsService';

const initialState: JobDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const jobDetailsSlice = createSlice({
    name: 'jobDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getJobDetailsService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                getJobDetailsService.fulfilled,
                (state, action: PayloadAction<Job>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(getJobDetailsService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: jobDetailsActions } = jobDetailsSlice;
export const { reducer: jobDetailsReducer } = jobDetailsSlice;
