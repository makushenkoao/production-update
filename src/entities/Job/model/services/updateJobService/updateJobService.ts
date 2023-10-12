import { createAsyncThunk } from '@reduxjs/toolkit';

import { Job } from '../../..';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const updateJobService = createAsyncThunk<
    Job,
    Job | undefined,
    ThunkConfig<string>
>('job/updateJobService', async (job, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        if (!job) {
            return rejectWithValue('Сталася непередбачена помилка');
        }

        const { data } = await extra.api.put<Job>(`/jobs/${job.id}`, job);

        if (!data) {
            return rejectWithValue('Сталася непередбачена помилка');
        }

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
