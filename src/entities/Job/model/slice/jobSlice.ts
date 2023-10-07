import { createSlice } from '@reduxjs/toolkit';
import { JobsSchema } from '../types/jobsSchema';

const initialState: JobsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const jobsSlice = createSlice({
    name: 'jobs',
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

export const { actions: jobsActions } = jobsSlice;
export const { reducer: jobsReducer } = jobsSlice;
