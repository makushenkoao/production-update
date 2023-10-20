import React, { memo, useCallback } from 'react';

import { ForumReply } from '@/entities/Forum';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AvatarWithUsername } from '@/shared/ui/redesigned/AvatarWithUsername';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { useGetUserByIdQuery } from '@/entities/User';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';

interface ForumDetailsMessagesItemProps {
    message?: ForumReply;
}

export const ForumDetailsMessagesItem = memo(
    (props: ForumDetailsMessagesItemProps) => {
        const { message } = props;
        const { data: user, isLoading: userLoading } = useGetUserByIdQuery(
            message?.userId || '',
        );

        const onLike = useCallback(() => {}, []);

        return (
            <Card
                max
                border="round"
                padding="24"
            >
                <VStack
                    max
                    gap="8"
                >
                    <HStack
                        max
                        justify="between"
                    >
                        <AppLink to={getRouteProfile(message?.userId || '')}>
                            <AvatarWithUsername
                                src={user?.avatar}
                                username={user?.username}
                                size={24}
                                loading={userLoading}
                            />
                        </AppLink>
                        <Text
                            size="s"
                            text={formatDate(message?.createdAt)}
                        />
                    </HStack>
                    <Text text={message?.content} />
                </VStack>
            </Card>
        );
    },
);
