import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { getUserAuthData } from '@/entities/User';
import { profileActions } from '../../slice/ProfileSlice';

// TODO Переделать эту дичь!!!!
export const followProfile = createAsyncThunk<
    void,
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/followProfile', async (_, ThunkApi) => {
    const { rejectWithValue, extra, getState, dispatch } = ThunkApi;

    const formData = getProfileForm(getState()); // profile data on page
    const currentUser = getUserAuthData(getState()); // current user on site

    if (!formData?.followers) {
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }

    try {
        const { data: currentProfile } = await extra.api.get<Profile>(
            `profile/${currentUser?.id}`,
        );

        if (!currentProfile.following) {
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }

        const isFollowing = currentProfile?.following.includes(
            formData.id || '',
        );

        const { data: followingProfile } = await extra.api.put<Profile>(
            `profile/${formData?.id}`,
            {
                ...formData,
                followers: isFollowing
                    ? formData.following?.filter(
                          (id) => id !== currentProfile.id,
                      )
                    : [...formData.followers, currentProfile.id],
            },
        );

        if (!currentProfile.following) {
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }

        await extra.api.put<Profile>(
            `/profile/${currentProfile.id}`,
            {
                ...currentProfile,
                following: isFollowing
                    ? currentProfile.following.filter(
                          (id) => id !== followingProfile?.id,
                      )
                    : [...currentProfile.following, followingProfile?.id],
            },
        );

        dispatch(profileActions.updateProfile(followingProfile));
    } catch (e) {
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
