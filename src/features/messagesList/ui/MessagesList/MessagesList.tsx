import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import cls from './MessagesList.module.scss';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import {
    MessageBox,
    useGetReceivedMessagesQuery,
    useGetSendMessagesQuery,
} from '@/entities/Message';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const MessagesList = () => {
    const { id } = useParams<{ id: string }>();
    const authData = useSelector(getUserAuthData);

    const { data: receivedData, isLoading: receivedIsLoading } =
        useGetReceivedMessagesQuery({
            fromUser: authData?.id ?? '',
            toUser: id ?? '',
        });

    const { data: sendData, isLoading: sendIsLoading } =
        useGetSendMessagesQuery({
            fromUser: id ?? '',
            toUser: authData?.id ?? '',
        });

    const message = receivedData
        ?.concat(sendData || [])
        .sort((a, b) => a.sendAt - b.sendAt);

    if (sendIsLoading || receivedIsLoading) {
        return (
            <Card
                max
                padding="24"
                fullHeight
                className={cls.messagesWrapper}
            >
                <VStack
                    gap="16"
                    max
                >
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                </VStack>
            </Card>
        );
    }

    return (
        <Card
            max
            padding="24"
            fullHeight
            className={cls.messagesWrapper}
        >
            <VStack
                gap="16"
                max
            >
                {message?.map((message) => (
                    <MessageBox
                        key={message.id}
                        message={message}
                    />
                ))}
            </VStack>
        </Card>
    );
};
