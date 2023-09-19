import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

export const articleRecommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], string>({
            query: (id) => ({
                url: '/notifications',
                params: {
                    userId: id,
                },
            }),
        }),
    }),
});

export const { useGetNotificationsQuery } = articleRecommendationsApi;
