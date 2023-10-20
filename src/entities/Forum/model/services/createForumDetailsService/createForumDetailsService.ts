import { createAsyncThunk } from '@reduxjs/toolkit';

import { Forum } from '../../../model/types/forum';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const createForumDetailsService = createAsyncThunk<
    Forum,
    Forum,
    ThunkConfig<string>
>('forums/createForumDetailsService', async (forum, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        if (!forum) {
            throw new Error('');
        }

        const { data } = await extra.api.post<Forum>('forums', forum);

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
