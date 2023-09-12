import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '..';

export const article = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticles: build.query<Article[], void>({
            query: () => ({
                url: '/articles',
                params: {
                    _expand: 'user',
                },
            }),
        }),
    }),
});

export const { useGetArticlesQuery } = article;
