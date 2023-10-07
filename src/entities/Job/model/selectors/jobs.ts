import { StateSchema } from '@/app/providers/StoreProvider';

export const getJobsIsLoading = (state: StateSchema) =>
    state.jobs?.isLoading || false;
export const getJobsError = (state: StateSchema) => state.jobs?.error;
export const getJobsPageLimit = (state: StateSchema) => state.jobs?.limit || 9;
export const getJobsPageNum = (state: StateSchema) => state.jobs?.page || 1;
export const getJobsSearch = (state: StateSchema) => state.jobs?.search ?? '';
export const getJobsHasMore = (state: StateSchema) => state.jobs?.hasMore;
export const getJobsInited = (state: StateSchema) => state.jobs?._inited;
