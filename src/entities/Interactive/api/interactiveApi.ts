import {
    Advice,
    Fact,
    Mystery,
    Quiz,
    Quote,
    Recipe,
    Task,
    Wordle,
} from '../model/types/interactive';

import { rtkApi } from '@/shared/api/rtkApi';

export const interactiveApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAdvices: build.query<Advice[], void>({
            query: (_) => ({
                url: '/advices',
                method: 'GET',
            }),
        }),
        getFacts: build.query<Fact[], void>({
            query: (_) => ({
                url: '/facts',
                method: 'GET',
            }),
        }),
        getQuotes: build.query<Quote[], void>({
            query: (_) => ({
                url: '/quotes',
                method: 'GET',
            }),
        }),
        getTasks: build.query<Task[], void>({
            query: (_) => ({
                url: '/tasks',
                method: 'GET',
            }),
        }),
        getRecipes: build.query<Recipe[], void>({
            query: (_) => ({
                url: '/recipes',
                method: 'GET',
            }),
        }),
        getQuizzes: build.query<Quiz[], void>({
            query: (_) => ({
                url: '/quizzes',
                method: 'GET',
            }),
        }),
        getMysteries: build.query<Mystery[], void>({
            query: (_) => ({
                url: '/mysteries',
                method: 'GET',
            }),
        }),
        getWordle: build.query<Wordle[], void>({
            query: (_) => ({
                url: '/wordle',
                method: 'GET',
            }),
        }),
        postAdvices: build.mutation<void, Advice>({
            query: (args) => ({
                url: '/advices',
                method: 'POST',
                body: args,
            }),
        }),
        postFacts: build.mutation<void, Fact>({
            query: (args) => ({
                url: '/facts',
                method: 'POST',
                body: args,
            }),
        }),
        postQuotes: build.mutation<void, Quote>({
            query: (args) => ({
                url: '/quotes',
                method: 'POST',
                body: args,
            }),
        }),
        postTasks: build.mutation<void, Task>({
            query: (args) => ({
                url: '/tasks',
                method: 'POST',
                body: args,
            }),
        }),
        postRecipes: build.mutation<void, Recipe>({
            query: (args) => ({
                url: '/recipes',
                method: 'POST',
                body: args,
            }),
        }),
        postQuizzes: build.mutation<void, Quiz>({
            query: (args) => ({
                url: '/quizzes',
                method: 'POST',
                body: args,
            }),
        }),
        postMysteries: build.mutation<void, Mystery>({
            query: (args) => ({
                url: '/mysteries',
                method: 'POST',
                body: args,
            }),
        }),
        postWordle: build.mutation<void, Wordle>({
            query: (args) => ({
                url: '/wordle',
                method: 'POST',
                body: args,
            }),
        }),
    }),
});

export const {
    useGetAdvicesQuery,
    useGetFactsQuery,
    useGetMysteriesQuery,
    useGetQuizzesQuery,
    useGetQuotesQuery,
    useGetRecipesQuery,
    useGetTasksQuery,
    useGetWordleQuery,
    usePostAdvicesMutation,
    usePostFactsMutation,
    usePostMysteriesMutation,
    usePostQuizzesMutation,
    usePostQuotesMutation,
    usePostRecipesMutation,
    usePostTasksMutation,
    usePostWordleMutation,
} = interactiveApi;
