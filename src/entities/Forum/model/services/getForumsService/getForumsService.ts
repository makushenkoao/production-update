import { createAsyncThunk } from '@reduxjs/toolkit';

import { Forum } from '../../types/forum';
import {
    getForumsPageLimit,
    getForumsPageNum,
    getForumsSearch,
} from '../../selectors/forum';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

interface getForumsServiceArgs {
    replace?: boolean;
}

export const getForumsService = createAsyncThunk<
    Forum[],
    getForumsServiceArgs,
    ThunkConfig<string>
>('forums/getForumsService', async (_, ThunkApi) => {
    const { rejectWithValue, extra, getState } = ThunkApi;
    const limit = getForumsPageLimit(getState());
    const page = getForumsPageNum(getState());
    const search = getForumsSearch(getState());

    try {
        addQueryParams({
            search,
        });

        const { data } = await extra.api.get<Forum[]>('/forums', {
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
