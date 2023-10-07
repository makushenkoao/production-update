import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';


import {
    getJobsHasMore,
    getJobsIsLoading,
    getJobsPageNum,
} from '../../selectors/jobs';
import { jobsActions } from '../../../model/slice/jobSlice';
import { getJobsService } from '../getJobsService/getJobsService';

export const getNextJobsService = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('job/getNextJobsService', async (_, ThunkApi) => {
    const { getState, dispatch } = ThunkApi;
    const hasMore = getJobsHasMore(getState());
    const page = getJobsPageNum(getState());
    const isLoading = getJobsIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(jobsActions.setPage(page + 1));
        dispatch(getJobsService({}));
    }
});
