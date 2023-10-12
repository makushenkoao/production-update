import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const deleteNotification = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>('profile/deleteNotification', async (id, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    try {
        await extra.api.delete(`/notifications/${id}`);
    } catch (e) {
        return rejectWithValue('errir');
    }
});
