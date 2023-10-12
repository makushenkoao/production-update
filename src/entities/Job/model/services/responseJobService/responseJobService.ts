import { createAsyncThunk } from '@reduxjs/toolkit';

import { Job } from '../../../model/types/job';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { sendNotification } from '@/entities/Notification';
import { getRouteJobResponses } from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';

export const responseJobService = createAsyncThunk<
    void,
    Job,
    ThunkConfig<string>
>('job/getJobsService', async (job, ThunkApi) => {
    const { rejectWithValue, extra, getState, dispatch } = ThunkApi;
    const authData = getUserAuthData(getState());

    if (!job || !authData) {
        return rejectWithValue('error');
    }

    try {
        await extra.api.put<Job>(`/jobs/${job.id}`, job);

        await dispatch(
            sendNotification({
                id: String(Date.now()),
                title: 'Відгук на вакансію',
                description: `На вашу вакансію ${job.title} відгукнувся ${authData.username}`,
                href: getRouteJobResponses(job.id),
                userId: job.userId,
            }),
        );
    } catch (e) {
        return rejectWithValue('error');
    }
});
