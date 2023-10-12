import { createAsyncThunk } from '@reduxjs/toolkit';

import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfile } from '../validateProfile/validateProfile';

import { Profile } from '@/entities/Profile';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData, User, userActions } from '@/entities/User';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (profileId, ThunkApi) => {
    const { rejectWithValue, extra, getState, dispatch } = ThunkApi;

    const formData = getProfileForm(getState());
    const authData = getUserAuthData(getState());
    const errors = validateProfile(formData!);

    if (errors.length) {
        return rejectWithValue(errors);
    }

    try {
        const { data } = await extra.api.put<Profile>(
            `/profile/${formData?.id}`,
            formData,
        );

        const { data: user } = await extra.api.put<User>(
            `/users/${authData?.id}`,
            {
                ...authData,
                avatar: formData?.avatar,
            },
        );

        dispatch(userActions.setAuthData(user));

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
