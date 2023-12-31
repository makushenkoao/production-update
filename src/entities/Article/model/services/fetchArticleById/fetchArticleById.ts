import { createAsyncThunk } from '@reduxjs/toolkit';

import { Article } from '../../types/article';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchArticleById = createAsyncThunk<
    Article,
    string | undefined,
    ThunkConfig<string>
>('articleDetails/fetchArticleById', async (articleId, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        if (!articleId) {
            throw new Error('');
        }

        const { data } = await extra.api.get<Article>(
            `/articles/${articleId}`,
            {
                params: {
                    _expand: 'user',
                },
            },
        );

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
