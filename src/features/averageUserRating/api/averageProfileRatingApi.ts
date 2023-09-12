import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entities/Rating';

export const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileRatingById: build.query<Rating[], { profileId?: string }>({
            query: ({ profileId }) => ({
                url: '/profile-ratings',
                params: {
                    profileId,
                },
            }),
        }),
    }),
});

export const { useGetProfileRatingByIdQuery } = profileRatingApi;
