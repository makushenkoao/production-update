import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

export const createArticle = createAsyncThunk<
    any,
    Article,
    ThunkConfig<string>
>('article/createArticle', async (article, ThunkApi) => {
    const { rejectWithValue, dispatch, extra } = ThunkApi;
    try {
        const { data } = await extra.api.post<User>('/articles', article);
        if (!data) throw new Error();
        return data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
