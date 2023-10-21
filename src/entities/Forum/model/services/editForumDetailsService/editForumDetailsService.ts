import { createAsyncThunk } from '@reduxjs/toolkit';

import { Forum } from '../../../model/types/forum';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const editForumDetailsService = createAsyncThunk<
    Forum,
    Forum,
    ThunkConfig<string>
>('forums/editForumDetailsService', async (forum, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        if (!forum) {
            throw new Error('');
        }

        const { data } = await extra.api.put<Forum>(
            `forums/${forum.id}`,
            forum,
        );

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
