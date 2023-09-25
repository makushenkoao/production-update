import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { Profile } from '@/entities/Profile';

interface saveArticleArgs {
    article?: Article;
    profile?: Profile;
}

export const saveArticle = createAsyncThunk<
    void,
    saveArticleArgs,
    ThunkConfig<string>
>('pages/saveArticle', async ({ article, profile }, ThunkApi) => {
    const { rejectWithValue, extra } = ThunkApi;

    if (!article || !profile) {
        throw new Error('');
    }

    try {
        const saved = profile?.saved || ([] as string[]);
        const isSaved = saved.includes(article.id);
        const newSaved = isSaved
            ? profile.saved?.filter((id) => id !== article.id)
            : [...(profile.saved || []), article.id];

        console.log(newSaved);

        await extra.api.put<Profile>(`profile/${profile.id}`, {
            ...profile,
            saved: newSaved,
        });
    } catch (e) {
        return rejectWithValue('Сталася непередбачена помилка');
    }
});
