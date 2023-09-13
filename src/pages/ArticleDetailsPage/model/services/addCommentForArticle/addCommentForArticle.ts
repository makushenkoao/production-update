import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { addCommentFormActions } from '@/features/AddCommentForm';
import { getArticleDetailsData } from '@/entities/Article';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>('article/addCommentForArticle', async (text, ThunkApi) => {
    const { rejectWithValue, extra, getState, dispatch } = ThunkApi;
    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
        return rejectWithValue('no data');
    }

    try {
        const { data } = await extra.api.post<Comment>('/comments', {
            articleId: article?.id,
            userId: userData.id,
            likes: 0,
            text,
        });
        if (!data) throw new Error();
        dispatch(addCommentFormActions.setText(''));
        dispatch(fetchCommentsByArticleId(article.id));
        return data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
