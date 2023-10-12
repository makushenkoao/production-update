import { createAsyncThunk } from '@reduxjs/toolkit';

import { Article } from '../../types/article';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const updateArticleDetails = createAsyncThunk<
    Article,
    Article,
    ThunkConfig<string>
>('articleDetails/updateArticleDetails', async (article, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        if (!article) {
            throw new Error('');
        }

        const { data } = await extra.api.put<Article>(
            `/articles/${article.id}`,
            article,
        );

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
