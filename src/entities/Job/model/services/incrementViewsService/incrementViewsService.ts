import { createAsyncThunk } from '@reduxjs/toolkit';

import { Job } from '../../types/job';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const incrementViewsService = createAsyncThunk<
    void,
    Job | undefined,
    ThunkConfig<string>
>('job/updateJobService', async (job, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    if (!job) {
        return rejectWithValue('Сталася непередбачена помилка');
    }

    try {
        await extra.api.put(`/jobs/${job.id}`, {
            ...job,
            views: job.views + 1,
        });
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
