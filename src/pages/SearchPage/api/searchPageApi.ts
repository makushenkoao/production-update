import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '@/entities/User';

export const searchPageApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        searchUsers: build.query<
            User[],
            {
                q?: string;
            }
        >({
            query: ({ q }) => ({
                url: '/users',
                params: {
                    q,
                },
            }),
        }),
    }),
});

export const { useSearchUsersQuery } = searchPageApi;
