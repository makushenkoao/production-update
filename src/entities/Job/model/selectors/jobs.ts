import { StateSchema } from '@/app/providers/StoreProvider';

export const getJobsData = (state: StateSchema) => state.jobs?.data;
export const getJobsIsLoading = (state: StateSchema) =>
    state.jobs?.isLoading || false;
export const getJobsError = (state: StateSchema) => state.jobs?.error;
