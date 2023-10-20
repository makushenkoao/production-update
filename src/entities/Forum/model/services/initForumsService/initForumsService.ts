import { createAsyncThunk } from '@reduxjs/toolkit';

import { getForumsInited } from '../../selectors/forum';
import { getForumsService } from '../../services/getForumsService/getForumsService';
import { forumsActions } from '../../slices/forumSlice';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const initForumsService = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('forums/initForumsService', async (searchParams, ThunkApi) => {
    const { getState, dispatch } = ThunkApi;
    const inited = getForumsInited(getState());

    if (!inited) {
        const searchFromUrl = searchParams.get('search');

        if (searchFromUrl) {
            dispatch(forumsActions.setSearch(searchFromUrl));
        }

        dispatch(forumsActions.initState());
        dispatch(getForumsService({}));
    }
});
