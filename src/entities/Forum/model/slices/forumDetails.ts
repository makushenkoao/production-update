import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Forum } from '../types/forum';
import { ForumDetailsSchema } from '../types/forumDetailsSchema';
import { getForumDetailsService } from '../services/getForumDetailsService/getForumDetailsService';

const initialState: ForumDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const forumDetailsSlice = createSlice({
    name: 'forumDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getForumDetailsService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                getForumDetailsService.fulfilled,
                (state, action: PayloadAction<Forum>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(getForumDetailsService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: forumDetailsActions } = forumDetailsSlice;
export const { reducer: forumDetailsReducer } = forumDetailsSlice;
