import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { getProfileForm } from '@/features/editableProfileCard';
import { getUserAuthData } from '@/entities/User';

// TODO Переделать эту дичь!!!!
export const blockProfile = createAsyncThunk<void, void, ThunkConfig<string>>(
    'profile/blockProfile',
    async (_, ThunkApi) => {
        const { rejectWithValue, extra, getState, dispatch } = ThunkApi;

        const formData = getProfileForm(getState());
        const currentUser = getUserAuthData(getState());

        if (!formData?.blockedUsers) {
            return rejectWithValue('error');
        }

        try {
            const { data: currentProfile } = await extra.api.get<Profile>(
                `profile/${currentUser?.id}`,
            );

            if (!currentProfile.blockedUsers) {
                return rejectWithValue('error');
            }

            const isBlocked = currentProfile?.blockedUsers.includes(
                formData.id || '',
            );

            await extra.api.put<Profile>(`profile/${currentProfile?.id}`, {
                ...currentProfile,
                blockedUsers: isBlocked
                    ? formData.blockedUsers?.filter((id) => id !== formData.id)
                    : [...formData.blockedUsers, formData.id],
            });
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
