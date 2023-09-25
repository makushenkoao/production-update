import { rtkApi } from '@/shared/api/rtkApi';
import { Profile } from '../../model/types/profile';

export const getProfileDataApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileData: build.query<Profile, string | undefined>({
            query: (id) => ({
                url: `/profile/${id}`,
            }),
        }),
    }),
});

export const { useGetProfileDataQuery } = getProfileDataApi;
