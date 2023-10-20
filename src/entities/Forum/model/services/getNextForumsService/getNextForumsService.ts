import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    getForumsHasMore,
    getForumsIsLoading,
    getForumsPageNum,
} from '../../selectors/forum';
import { getForumsService } from '../getForumsService/getForumsService';
import { forumsActions } from '../../slices/forumSlice';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const getNextForumsService = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('forums/getNextForumsService', async (_, ThunkApi) => {
    const { getState, dispatch } = ThunkApi;
    const hasMore = getForumsHasMore(getState());
    const page = getForumsPageNum(getState());
    const isLoading = getForumsIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(forumsActions.setPage(page + 1));
        dispatch(getForumsService({}));
    }
});
