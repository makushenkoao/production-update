import { StateSchema } from '@/app/providers/StoreProvider';

export const getForumDetailsData = (state: StateSchema) =>
    state.forumDetails?.data;
export const getForumDetailsIsLoading = (state: StateSchema) =>
    state.forumDetails?.isLoading || false;
export const getForumDetailsError = (state: StateSchema) =>
    state.forumDetails?.error;
