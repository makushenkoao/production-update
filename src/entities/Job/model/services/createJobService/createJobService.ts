import { createAsyncThunk } from '@reduxjs/toolkit';

import { Job } from '../../..';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const createJobService = createAsyncThunk<
    Job,
    Job | undefined,
    ThunkConfig<string>
>('job/createJobService', async (job, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    if (!job) {
        return rejectWithValue('Сталася непередбачена помилка');
    }

    try {
        const { data } = await extra.api.post('/jobs', job);

        if (data) {
            return rejectWithValue('Сталася непередбачена помилка');
        }

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
