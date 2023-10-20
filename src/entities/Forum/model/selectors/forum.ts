import { StateSchema } from '@/app/providers/StoreProvider';

export const getForumsIsLoading = (state: StateSchema) =>
    state.forums?.isLoading || false;
export const getForumsError = (state: StateSchema) => state.forums?.error;
export const getForumsPageLimit = (state: StateSchema) => state.forums?.limit || 9;
export const getForumsPageNum = (state: StateSchema) => state.forums?.page || 1;
export const getForumsSearch = (state: StateSchema) => state.forums?.search ?? '';
export const getForumsHasMore = (state: StateSchema) => state.forums?.hasMore;
export const getForumsInited = (state: StateSchema) => state.forums?._inited;
