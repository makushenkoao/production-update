import { Article } from '..';

import { rtkApi } from '@/shared/api/rtkApi';

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
        getRecentArticles: build.query<Article[], void>({
            query: () => ({
                url: '/articles',
                params: {
                    _expand: 'user',
                    _sort: 'createdAt',
                    _order: 'desc',
                },
            }),
        }),
        getFollowingArticles: build.query<Article[], string[]>({
            query: (_) => ({
                url: '/articles',
                params: {
                    _expand: 'user',
                    _sort: 'createdAt',
                    _order: 'desc',
                },
            }),
            transformResponse: (response: Article[], _, ids) => {
                return response.filter((article) =>
                    ids.includes(article.user.id),
                );
            },
        }),
        getPopularArticles: build.query<Article[], void>({
            query: () => ({
                url: '/articles',
                params: {
                    _expand: 'user',
                    _sort: 'views',
                    _order: 'desc',
                },
            }),
        }),
    }),
});

export const {
    useGetArticlesQuery,
    useGetRecentArticlesQuery,
    useGetFollowingArticlesQuery,
    useGetPopularArticlesQuery,
} = article;
