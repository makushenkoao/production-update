import { createAsyncThunk } from '@reduxjs/toolkit';

import { Job } from '../../types/job';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const deleteJobService = createAsyncThunk<
    Job,
    string | undefined,
    ThunkConfig<string>
>('job/deleteJobService', async (jobId, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    if (!jobId) {
        return rejectWithValue('Сталася непередбачена помилка');
    }

    try {
        const { data } = await extra.api.delete<Job>(`/jobs/${jobId}`);

        if (!data) {
            return rejectWithValue('Сталася непередбачена помилка');
        }

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
