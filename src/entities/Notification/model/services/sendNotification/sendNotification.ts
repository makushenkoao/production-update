import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Notification } from '../../types/notification';

export const sendNotification = createAsyncThunk<
    void,
    Notification,
    ThunkConfig<string>
>('profile/followProfile', async (notification, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        await extra.api.post('/notifications', notification);
    } catch (e) {
        return rejectWithValue('errir');
    }
});
