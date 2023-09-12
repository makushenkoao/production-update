import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface RegisterProps {
    username?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
}

export const register = createAsyncThunk<
    User,
    RegisterProps,
    ThunkConfig<string>
>('register', async (authData, ThunkApi) => {
    const { rejectWithValue, dispatch, extra } = ThunkApi;
    try {
        const { data } = await extra.api.post<User>('/register', authData);
        if (!data) throw new Error();
        dispatch(userActions.setAuthData(data));
        return data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
