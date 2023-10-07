import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Job } from '../../..';

export const getJobDetailsService = createAsyncThunk<
    Job,
    string | undefined,
    ThunkConfig<string>
>('job/getJobDetailsService', async (jobId, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        if (!jobId) {
            throw new Error('');
        }

        const { data } = await extra.api.get<Job>(`/jobs/${jobId}`, {
            params: {
                _expand: 'user',
            },
        });

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
