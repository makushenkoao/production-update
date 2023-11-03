import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '@/entities/User';
import { Article } from '@/entities/Article';
import { Profile } from '@/entities/Profile';

export const deleteAccount = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        deleteUser: build.mutation<User, string>({
            query: (userId) => ({
                url: `users/${userId}`,
                method: 'DELETE',
            }),
        }),
        deleteProfile: build.mutation<Profile, string>({
            query: (userId) => ({
                url: `profile/${userId}`,
                method: 'DELETE',
            }),
        }),
        deleteArticlesByUserId: build.mutation<Article[], string>({
            query: (userId) => ({
                url: `articles?userId=${userId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useDeleteArticlesByUserIdMutation,
    useDeleteProfileMutation,
    useDeleteUserMutation,
} = deleteAccount;
