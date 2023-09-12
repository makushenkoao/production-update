import { StateSchema } from '@/app/providers/StoreProvider';

export const getRegisterIsLoading = (state: StateSchema) =>
    state?.registerForm?.isLoading || false;
export const getRegisterError = (state: StateSchema) =>
    state?.registerForm?.error;
export const getRegisterFirstname = (state: StateSchema) =>
    state?.registerForm?.firstname ?? '';
export const getRegisterLastname = (state: StateSchema) =>
    state?.registerForm?.lastname ?? '';
export const getRegisterUsername = (state: StateSchema) =>
    state?.registerForm?.username ?? '';
export const getRegisterPassword = (state: StateSchema) =>
    state?.registerForm?.password ?? '';
