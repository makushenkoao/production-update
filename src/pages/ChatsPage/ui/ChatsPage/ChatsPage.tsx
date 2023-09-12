import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteChat } from '@/shared/const/router';
import { useGetAllMessagesQuery } from '@/entities/Message';
import { getUserAuthData } from '@/entities/User';
import { formatTime } from '@/shared/lib/utils/formatTime/formatTime';
import { UserInfo } from '@/features/UserInfo';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface Chats {
    id: string;
    userId: string;
    lastMessage: string;
    sendAt: number;
}

const ChatsPage = () => {
    const { data: allMessages, isLoading, isError } = useGetAllMessagesQuery();
    const authData = useSelector(getUserAuthData);

    const chats: { [userId: string]: Chats } = {};

    const filteredMessages = allMessages?.filter(
        (message) =>
            message.fromUser === authData?.id ||
            message.toUser === authData?.id,
    );

    filteredMessages?.forEach((message) => {
        const userId =
            message.fromUser === authData?.id
                ? message.toUser
                : message.fromUser;
        if (!chats[userId] || chats[userId].sendAt < message.sendAt) {
            chats[userId] = {
                id: message.id,
                userId,
                lastMessage: message.message,
                sendAt: message.sendAt,
            };
        }
    });

    const chatsList = Object.values(chats);

    if (isLoading) {
        return (
            <VStack
                max
                gap="16"
            >
                <Skeleton height={100} />
                <Skeleton height={100} />
                <Skeleton height={100} />
                <Skeleton height={100} />
                <Skeleton height={100} />
            </VStack>
        );
    }

    return (
        <VStack
            max
            gap="16"
        >
            {chatsList?.map((message) => (
                <AppLink
                    to={getRouteChat(message.userId)}
                    max
                    key={message.id}
                >
                    <Card
                        max
                        padding="24"
                    >
                        <VStack
                            max
                            gap="16"
                        >
                            <UserInfo userId={message.userId} />
                            <Text
                                text={`${message.lastMessage} | ${formatTime(
                                    message.sendAt,
                                )}`}
                            />
                        </VStack>
                    </Card>
                </AppLink>
            ))}
        </VStack>
    );
};

export default ChatsPage;
