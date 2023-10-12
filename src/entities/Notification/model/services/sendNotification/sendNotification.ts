import { createAsyncThunk } from '@reduxjs/toolkit';

import { Notification } from '../../types/notification';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const sendNotification = createAsyncThunk<
    void,
    Notification,
    ThunkConfig<string>
>('profile/sendNotification', async (notification, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        await extra.api.post('/notifications', notification);
    } catch (e) {
        return rejectWithValue('errir');
    }
});
