import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleDetailsData } from '@/entities/Article';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const deleteComment = createAsyncThunk<
    void,
    string | undefined,
    ThunkConfig<string>
>('article/addCommentForArticle', async (commentId, ThunkApi) => {
    const { rejectWithValue, extra, getState, dispatch } = ThunkApi;
    const article = getArticleDetailsData(getState());

    if (!commentId || !article?.id) {
        return rejectWithValue('no data');
    }

    try {
        await extra.api.delete(`/comments/${commentId}`);
        dispatch(fetchCommentsByArticleId(article.id));
    } catch (e) {
        return rejectWithValue('error');
    }
});
