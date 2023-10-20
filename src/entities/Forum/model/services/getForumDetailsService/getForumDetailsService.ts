import { createAsyncThunk } from '@reduxjs/toolkit';

import { Forum } from '../../../model/types/forum';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const getForumDetailsService = createAsyncThunk<
    Forum,
    string | undefined,
    ThunkConfig<string>
>('forums/getForumDetailsService', async (forumId, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        if (!forumId) {
            throw new Error('');
        }

        const { data } = await extra.api.get<Forum>(`/forums/${forumId}`, {
            params: {
                _expand: 'user',
            },
        });

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
