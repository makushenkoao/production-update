import { createAsyncThunk } from '@reduxjs/toolkit';

import { Forum, ForumReply } from '../../../model/types/forum';
import { getForumDetailsService } from '../getForumDetailsService/getForumDetailsService';
import { getForumDetailsData } from '../../selectors/forumDetails';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const addMessageForumDetailsService = createAsyncThunk<
    Forum,
    ForumReply,
    ThunkConfig<string>
>('forums/addMessageForumDetailsService', async (forumReply, ThunkApi) => {
    const { rejectWithValue, extra, getState, dispatch } = ThunkApi;
    const forum = getForumDetailsData(getState());

    try {
        if (!forum || !forumReply) {
            throw new Error('');
        }

        const { data } = await extra.api.put<Forum>(`forums/${forum.id}`, {
            ...forum,
            reply: [...(forum.reply || []), forumReply],
        });

        if (!data) {
            throw new Error();
        }

        await dispatch(getForumDetailsService(forum.id));

        return data;
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
