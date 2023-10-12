import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import { JobsSchema } from '../types/jobsSchema';
import { getJobsService } from '../services/getJobsService/getJobsService';
import { Job } from '../..';

import { StateSchema } from '@/app/providers/StoreProvider';

const jobsAdapter = createEntityAdapter<Job>({
    selectId: (job) => job.id,
});

export const getJobs = jobsAdapter.getSelectors<StateSchema>(
    (state) => state.jobs || jobsAdapter.getInitialState(),
);

export const jobsSlice = createSlice({
    name: 'jobs',
    initialState: jobsAdapter.getInitialState<JobsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        page: 1,
        limit: 9,
        hasMore: true,
        _inited: false,
        search: '',
    }),
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        initState: (state) => {
            state.limit = 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getJobsService.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    jobsAdapter.removeAll(state);
                }
            })
            .addCase(getJobsService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    jobsAdapter.setAll(state, action.payload);
                } else {
                    jobsAdapter.addMany(state, action.payload);
                }
            })
            .addCase(getJobsService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: jobsActions } = jobsSlice;
export const { reducer: jobsReducer } = jobsSlice;
