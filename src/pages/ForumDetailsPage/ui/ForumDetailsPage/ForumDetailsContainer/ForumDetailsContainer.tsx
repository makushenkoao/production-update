import { memo } from 'react';

import { Forum } from '@/entities/Forum';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface ForumDetailsContainerProps {
    forum?: Forum;
    loading?: boolean;
}

export const ForumDetailsContainer = memo(
    (props: ForumDetailsContainerProps) => {
        const { forum, loading } = props;

        if (loading) {
            return (
                <VStack
                    gap="16"
                    max
                >
                    <Card
                        border="round"
                        max
                        padding="24"
                    >
                        <VStack
                            max
                            gap="16"
                        >
                            <Skeleton
                                height={40}
                                borderRadius="12px"
                            />
                            <Skeleton
                                height={100}
                                borderRadius="12px"
                            />
                        </VStack>
                    </Card>
                </VStack>
            );
        }

        return (
            <VStack
                gap="16"
                max
            >
                <Card
                    border="round"
                    max
                    padding="24"
                >
                    <VStack
                        max
                        gap="16"
                    >
                        <Text
                            title={forum?.title}
                            text={forum?.description}
                        />
                    </VStack>
                </Card>
            </VStack>
        );
    },
);
