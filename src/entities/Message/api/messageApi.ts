import { Message } from '../model/types/message';

import { rtkApi } from '@/shared/api/rtkApi';

interface messagesArgs {
    fromUser: string;
    toUser: string;
}

export const messageApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAllMessages: build.query<Message[], void>({
            query: () => ({
                url: '/messages',
            }),
        }),
        getSendMessages: build.query<Message[], messagesArgs>({
            query: ({ fromUser, toUser }) => ({
                url: '/messages',
                params: {
                    fromUser,
                    toUser,
                },
            }),
        }),
        getReceivedMessages: build.query<Message[], messagesArgs>({
            query: ({ toUser, fromUser }) => ({
                url: '/messages',
                params: {
                    fromUser,
                    toUser,
                },
            }),
        }),
        writeMessage: build.mutation<void, Message>({
            query: (arg) => ({
                url: '/messages',
                method: 'POST',
                body: arg,
            }),
        }),
        deleteMessage: build.mutation<void, string>({
            query: (id) => ({
                url: `/messages/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetReceivedMessagesQuery,
    useGetSendMessagesQuery,
    useWriteMessageMutation,
    useGetAllMessagesQuery,
    useDeleteMessageMutation,
} = messageApi;
