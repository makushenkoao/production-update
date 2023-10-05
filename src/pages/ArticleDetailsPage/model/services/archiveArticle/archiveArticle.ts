import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleDetailsData } from '@/entities/Article';
import { Profile } from '@/entities/Profile';

export const archiveArticle = createAsyncThunk<
    void,
    Profile | undefined,
    ThunkConfig<string>
>('article/archiveArticle', async (profile, ThunkApi) => {
    const { rejectWithValue, extra, getState } = ThunkApi;
    const article = getArticleDetailsData(getState());

    if (!profile || !article) {
        return rejectWithValue('error');
    }

    try {
        await extra.api.delete(`/articles/${article.id}`);
        await extra.api.put(`profile/${profile.id}`, {
            ...profile,
            archive: [...(profile.archive || []), article],
        });
    } catch (e) {
        return rejectWithValue('error');
    }
});
