import { createAsyncThunk } from '@reduxjs/toolkit';

import { Profile } from '../..';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const getProfilesData = createAsyncThunk<
    Profile[],
    string[] | undefined,
    ThunkConfig<string>
>('profile/getProfilesData', async (ids, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    if (!ids) {
        throw new Error('');
    }

    try {
        const data = await Promise.all(
            ids.map(async (id) => {
                const response = await extra.api.get<Profile>(`/profile/${id}`);
                return response.data;
            }),
        );

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
