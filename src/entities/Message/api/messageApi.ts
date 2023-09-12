import { rtkApi } from '@/shared/api/rtkApi';
import { Message } from '../model/types/message';

interface getMessagesArgs {
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
        getSendMessages: build.query<Message[], getMessagesArgs>({
            query: ({ fromUser, toUser }) => ({
                url: '/messages',
                params: {
                    fromUser,
                    toUser,
                },
            }),
        }),
        getReceivedMessages: build.query<Message[], getMessagesArgs>({
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
    }),
});

export const {
    useGetReceivedMessagesQuery,
    useGetSendMessagesQuery,
    useWriteMessageMutation,
    useGetAllMessagesQuery,
} = messageApi;
