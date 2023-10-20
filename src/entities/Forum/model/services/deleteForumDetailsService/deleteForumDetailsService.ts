import { createAsyncThunk } from '@reduxjs/toolkit';

import { Forum } from '../../../model/types/forum';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const deleteForumDetailsService = createAsyncThunk<
    Forum,
    string | undefined,
    ThunkConfig<string>
>('forums/deleteForumDetailsService', async (forumId, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        if (!forumId) {
            throw new Error('');
        }

        const { data } = await extra.api.delete<Forum>(`/forums/${forumId}`);

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
