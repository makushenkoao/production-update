import React, { memo } from 'react';

import { ForumDetailsMessagesItem } from '../ForumDetailsMessagesItem/ForumDetailsMessagesItem';

import { ForumReply } from '@/entities/Forum';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface ForumDetailsMessagesProps {
    messages?: ForumReply[];
    loading?: boolean;
}

export const ForumDetailsMessagesList = memo(
    (props: ForumDetailsMessagesProps) => {
        const { messages, loading } = props;

        if (loading) {
            return (
                <VStack
                    max
                    gap="16"
                >
                    {[1, 2, 3]?.map((num) => (
                        <Card
                            key={num}
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
                                    <HStack gap="8">
                                        <Skeleton
                                            width={24}
                                            height={24}
                                            borderRadius="50%"
                                        />
                                        <Skeleton
                                            width={100}
                                            height={20}
                                            borderRadius="12px"
                                        />
                                    </HStack>
                                    <HStack gap="16">
                                        <Skeleton
                                            width={80}
                                            height={18}
                                            borderRadius="12px"
                                        />
                                        <HStack gap="4">
                                            <Skeleton
                                                width={24}
                                                height={24}
                                                borderRadius="50%"
                                            />
                                            <Skeleton
                                                width={40}
                                                height={18}
                                                borderRadius="12px"
                                            />
                                        </HStack>
                                    </HStack>
                                </HStack>
                                <Skeleton
                                    height={60}
                                    borderRadius="12px"
                                />
                            </VStack>
                        </Card>
                    ))}
                </VStack>
            );
        }

        return (
            <VStack
                max
                gap="16"
            >
                {messages?.map((message) => (
                    <ForumDetailsMessagesItem
                        key={message.id}
                        message={message}
                    />
                ))}
            </VStack>
        );
    },
);
