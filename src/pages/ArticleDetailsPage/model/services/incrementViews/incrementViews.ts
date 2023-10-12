import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

export const incrementViews = createAsyncThunk<
    Article,
    Article | undefined,
    ThunkConfig<string>
>('articleDetails/incrementViews', async (article, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    if (!article) {
        return rejectWithValue('error');
    }

    try {
        const { data } = await extra.api.put<Article>(
            `articles/${article.id}`,
            {
                ...article,
                views: article.views + 1,
            },
        );

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
