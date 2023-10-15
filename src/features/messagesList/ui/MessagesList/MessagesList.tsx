import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import cls from './MessagesList.module.scss';

import {
    MessageBox,
    useGetReceivedMessagesQuery,
    useGetSendMessagesQuery,
} from '@/entities/Message';
import { getUserAuthData } from '@/entities/User';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const MessagesList = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const messagesListRef = useRef<HTMLDivElement | null>(null);

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

    const scrollToLastMessage = () => {
        if (messagesListRef.current) {
            const messagesList = messagesListRef.current;
            messagesList.scrollTop = messagesList.scrollHeight;
        }
    };

    useEffect(() => {
        if (messagesListRef.current) {
            scrollToLastMessage();
        }
    }, [message]);

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

    if (!sendIsLoading && !receivedIsLoading && message?.length === 0) {
        return (
            <Card
                max
                fullHeight
            >
                <div className={cls.center}>
                    <Text title={t('У вас ще немає повідомлень')} />
                </div>
            </Card>
        );
    }

    return (
        <div
            className={cls.messagesWrapper}
            ref={messagesListRef}
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
            <div
                className={cls.icon}
                onClick={scrollToLastMessage}
            >
                <ArrowIcon
                    width={48}
                    height={48}
                />
            </div>
        </div>
    );
};
