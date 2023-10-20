import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import { getForumsService } from '../../model/services/getForumsService/getForumsService';
import { Forum } from '../types/forum';
import { ForumsSchema } from '../types/forumsSchema';

import { StateSchema } from '@/app/providers/StoreProvider';

const forumsAdapter = createEntityAdapter<Forum>({
    selectId: (forum) => forum.id,
});

export const getForums = forumsAdapter.getSelectors<StateSchema>(
    (state) => state.forums || forumsAdapter.getInitialState(),
);

export const forumsSlice = createSlice({
    name: 'forums',
    initialState: forumsAdapter.getInitialState<ForumsSchema>({
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
            .addCase(getForumsService.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    forumsAdapter.removeAll(state);
                }
            })
            .addCase(getForumsService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    forumsAdapter.setAll(state, action.payload);
                } else {
                    forumsAdapter.addMany(state, action.payload);
                }
            })
            .addCase(getForumsService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: forumsActions } = forumsSlice;
export const { reducer: forumsReducer } = forumsSlice;
