import { rtkApi } from '@/shared/api/rtkApi';

interface RegisterUserArgs {
    id: string;
    username: string;
    password: string;
}

interface RegisterProfileArgs {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
}

export const register = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        registerProfile: build.mutation<void, RegisterProfileArgs>({
            query: (arg) => ({
                url: '/profile',
                method: 'POST',
                body: arg,
            }),
        }),
        registerUser: build.mutation<void, RegisterUserArgs>({
            query: (arg) => ({
                url: '/users',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useRegisterProfileMutation } = register;
