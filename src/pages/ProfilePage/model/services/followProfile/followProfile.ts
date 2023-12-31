import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { getProfileForm, profileActions } from '@/features/editableProfileCard';
import { getUserAuthData } from '@/entities/User';
import { getRouteProfile } from '@/shared/const/router';
import { sendNotification } from '@/entities/Notification';

// TODO Переделать эту дичь!!!!
export const followProfile = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('profile/followProfile', async (_, ThunkApi) => {
    const { rejectWithValue, extra, getState, dispatch } = ThunkApi;

    const formData = getProfileForm(getState()); // profile data on page
    const currentUser = getUserAuthData(getState()); // current user on site

    if (!formData?.followers) {
        return rejectWithValue('error');
    }

    try {
        const { data: currentProfile } = await extra.api.get<Profile>(
            `profile/${currentUser?.id}`,
        );

        if (!currentProfile.following) {
            return rejectWithValue('erroe');
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
            return rejectWithValue('error');
        }

        await extra.api.put<Profile>(`/profile/${currentProfile.id}`, {
            ...currentProfile,
            following: isFollowing
                ? currentProfile.following.filter(
                      (id) => id !== followingProfile?.id,
                  )
                : [...currentProfile.following, followingProfile?.id],
        });

        dispatch(profileActions.updateProfile(followingProfile));

        if (!isFollowing) {
            dispatch(
                sendNotification({
                    id: Date.now().toString(),
                    title: 'Нове повідомлення',
                    description: `На ваш профіль підписався ${currentUser?.username}`,
                    href: getRouteProfile(currentUser?.id || ''),
                    userId: followingProfile.id,
                }),
            );
        }
    } catch (e) {
        return rejectWithValue('error');
    }
});
