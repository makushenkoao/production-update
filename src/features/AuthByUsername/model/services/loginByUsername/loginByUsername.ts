import { createAsyncThunk } from '@reduxjs/toolkit';

import { User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async (authData, ThunkApi) => {
    const { rejectWithValue, dispatch, extra } = ThunkApi;
    try {
        const { data } = await extra.api.post<User>('/login', authData);
        if (!data) throw new Error();

        dispatch(userActions.setAuthData(data));
        return data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
