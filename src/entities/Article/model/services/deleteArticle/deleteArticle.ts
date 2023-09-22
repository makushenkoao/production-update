import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';

export const deleteArticle = createAsyncThunk<
    void,
    string | undefined,
    ThunkConfig<string>
>('articleDetails/fetchArticleById', async (articleId, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        if (!articleId) {
            throw new Error('');
        }

        await extra.api.delete<Article>(`/articles/${articleId}`);
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
