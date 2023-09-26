import { rtkApi } from '@/shared/api/rtkApi';
import { Interactive } from '../model/types/interactive';

export const interactiveApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getInteractiveFacts: build.query<Interactive, void>({
            query: () => ({
                url: '/interactive',
            }),
        }),
    }),
});

export const { useGetInteractiveFactsQuery } = interactiveApi;
