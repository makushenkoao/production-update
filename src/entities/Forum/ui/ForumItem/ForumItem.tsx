import { memo } from 'react';

import { Forum } from '../..';

import { getRouteForumDetails } from '@/shared/const/router';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ChatIcon from '@/shared/assets/icons/chat.svg';
import { AvatarWithUsername } from '@/shared/ui/redesigned/AvatarWithUsername';
import { AppLink } from '@/shared/ui/redesigned/AppLink';

interface ForumItemProps {
    forum?: Forum;
}

export const ForumItem = memo((props: ForumItemProps) => {
    const { forum } = props;

    return (
        <AppLink
            to={getRouteForumDetails(forum?.id || '')}
            max
        >
            <Card
                key={forum?.id}
                border="round"
                padding="24"
                max
            >
                <VStack
                    max
                    gap="8"
                >
                    <HStack
                        max
                        gap="16"
                        justify="between"
                    >
                        <Text
                            text={forum?.title}
                            bold
                        />
                        <HStack gap="4">
                            <Text
                                size="s"
                                text={forum?.category}
                            />
                            <Text
                                size="s"
                                text={formatDate(forum?.createdAt)}
                            />
                            <HStack>
                                <Icon
                                    svg={ChatIcon}
                                    width={18}
                                    height={18}
                                />
                                <Text
                                    text={String(forum?.reply?.length)}
                                    size="s"
                                />
                            </HStack>
                        </HStack>
                    </HStack>
                    <AvatarWithUsername
                        src={forum?.user?.avatar}
                        username={forum?.user?.username}
                        size={24}
                    />
                    <Text text={forum?.description} />
                </VStack>
            </Card>
        </AppLink>
    );
});
