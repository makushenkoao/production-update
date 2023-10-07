import { StateSchema } from '@/app/providers/StoreProvider';

export const getJobDetailsData = (state: StateSchema) => state.jobDetails?.data;
export const getJobDetailsIsLoading = (state: StateSchema) =>
    state.jobDetails?.isLoading || false;
export const getJobDetailsError = (state: StateSchema) =>
    state.jobDetails?.error;
