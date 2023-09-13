import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { getArticleDetailsData } from '@/entities/Article';
import { fetchCommentsByArticleId } from '@/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getUserAuthData } from '@/entities/User';

export const addLikeToComment = createAsyncThunk<
    Comment,
    Comment,
    ThunkConfig<string>
>('article/addCommentForArticle', async (comment, ThunkApi) => {
    const { rejectWithValue, extra, getState, dispatch } = ThunkApi;
    const article = getArticleDetailsData(getState());
    const userData = getUserAuthData(getState());
    if (!userData) {
        return rejectWithValue('error');
    }

    try {
        const isUserLiked = comment.likes.includes(userData?.id);
        const { data } = await extra.api.put<Comment>(
            `/comments/${comment.id}`,
            {
                ...comment,
                likes: isUserLiked
                    ? comment.likes.filter((id) => id !== userData?.id)
                    : [...comment.likes, userData?.id],
            },
        );
        if (!data) throw new Error();
        dispatch(fetchCommentsByArticleId(article?.id));
        return data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
