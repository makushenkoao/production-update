import { createAsyncThunk } from '@reduxjs/toolkit';

import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfile } from '../validateProfile/validateProfile';

import { Profile } from '@/entities/Profile';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, ThunkApi) => {
    const { rejectWithValue, extra, getState } = ThunkApi;

    const formData = getProfileForm(getState());

    const errors = validateProfile(formData);

    if (errors.length) {
        return rejectWithValue(errors);
    }

    try {
        const { data } = await extra.api.put<Profile>(
            `/profile/${formData?.id}`,
            formData,
        );

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
