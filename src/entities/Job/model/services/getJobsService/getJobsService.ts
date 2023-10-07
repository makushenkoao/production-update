import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { Job } from '../../../model/types/job';
import {
    getJobsPageLimit,
    getJobsPageNum,
    getJobsSearch,
} from '../../selectors/jobs';

interface getJobsServiceArgs {
    replace?: boolean;
}

export const getJobsService = createAsyncThunk<
    Job[],
    getJobsServiceArgs,
    ThunkConfig<string>
>('job/getJobsService', async (_, ThunkApi) => {
    const { rejectWithValue, extra, getState } = ThunkApi;
    const limit = getJobsPageLimit(getState());
    const page = getJobsPageNum(getState());
    const search = getJobsSearch(getState());

    try {
        addQueryParams({
            search,
        });

        const { data } = await extra.api.get<Job[]>('/jobs', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                q: search,
            },
        });

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
