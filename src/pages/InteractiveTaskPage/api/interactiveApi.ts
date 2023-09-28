import { rtkApi } from '@/shared/api/rtkApi';

import {Interactive} from "@/entities/Interactive";

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
