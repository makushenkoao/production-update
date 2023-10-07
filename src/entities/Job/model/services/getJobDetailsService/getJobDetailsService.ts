import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const getJobDetailsService = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articleDetails/fetchArticleById', async (_, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        await extra.api.get('/jobs');
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
