import { createSlice } from '@reduxjs/toolkit';
import { JobDetailsSchema } from '../types/jobDetailsSchema';

const initialState: JobDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const jobDetailsSlice = createSlice({
    name: 'jobDetails',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchArticleById.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(
    //             fetchArticleById.fulfilled,
    //             (state, action: PayloadAction<Article>) => {
    //                 state.isLoading = false;
    //                 state.data = action.payload;
    //             },
    //         )
    //         .addCase(fetchArticleById.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: jobDetailsActions } = jobDetailsSlice;
export const { reducer: jobDetailsReducer } = jobDetailsSlice;
