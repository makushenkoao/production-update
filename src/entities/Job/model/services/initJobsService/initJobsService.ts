import { createAsyncThunk } from '@reduxjs/toolkit';

import { getJobsInited } from '../../selectors/jobs';
import { jobsActions } from '../../../model/slice/jobSlice';
import { getJobsService } from '../getJobsService/getJobsService';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const initJobsService = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('jobs/initJobsService', async (searchParams, ThunkApi) => {
    const { getState, dispatch } = ThunkApi;
    const inited = getJobsInited(getState());

    if (!inited) {
        const searchFromUrl = searchParams.get('search');

        if (searchFromUrl) {
            dispatch(jobsActions.setSearch(searchFromUrl));
        }

        dispatch(jobsActions.initState());
        dispatch(getJobsService({}));
    }
});
