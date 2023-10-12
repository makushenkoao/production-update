import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { addCommentFormActions } from '@/features/AddCommentForm';
import { getArticleDetailsData } from '@/entities/Article';

interface addCommentForArticleProps {
    text: string;
    parentId?: string;
}

export const addCommentForArticle = createAsyncThunk<
    Comment,
    addCommentForArticleProps,
    ThunkConfig<string>
>('article/addCommentForArticle', async ({ text, parentId }, ThunkApi) => {
    const { rejectWithValue, extra, getState, dispatch } = ThunkApi;
    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
        return rejectWithValue('no data');
    }

    try {
        const requestData: Omit<Comment, 'id' | 'user'> = {
            articleId: article?.id,
            userId: userData.id,
            likes: [],
            text,
        };

        if (parentId) {
            requestData.parentId = parentId;
        }

        const { data } = await extra.api.post<Comment>(
            '/comments',
            requestData,
        );

        if (!data) throw new Error();

        dispatch(addCommentFormActions.setText(''));
        dispatch(fetchCommentsByArticleId(article.id));
        return data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
