import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

interface fetchArticleListProps {
    replace?: boolean;
}

export const fetchArticleList = createAsyncThunk<
    Article[],
    fetchArticleListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticleList', async (_, ThunkApi) => {
    const { rejectWithValue, extra, getState } = ThunkApi;
    const limit = getArticlesPageLimit(getState());
    const order = getArticlesPageOrder(getState());
    const sort = getArticlesPageSort(getState());
    const search = getArticlesPageSearch(getState());
    const type = getArticlesPageType(getState());
    const page = getArticlesPageNum(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        });
        const { data } = await extra.api.get<Article[]>('articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                _order: order,
                _sort: sort,
                type: type === ArticleType.ALL ? undefined : type,
                q: search,
            },
        });

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
