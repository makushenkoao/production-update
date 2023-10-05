import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { Profile } from '@/entities/Profile';

interface unArchiveArticleArgs {
    profile?: Profile;
    article?: Article;
}

export const unArchiveArticle = createAsyncThunk<
    void,
    unArchiveArticleArgs,
    ThunkConfig<string>
>('article/unArchiveArticle', async ({ article, profile }, ThunkApi) => {
    const { rejectWithValue, extra, getState } = ThunkApi;

    if (!profile || !article) {
        return rejectWithValue('error');
    }

    try {
        await extra.api.post('/articles', article);
        await extra.api.put(`profile/${profile.id}`, {
            ...profile,
            archive: profile.archive?.filter((item) => item.id !== article.id),
        });
    } catch (e) {
        return rejectWithValue('error');
    }
});
