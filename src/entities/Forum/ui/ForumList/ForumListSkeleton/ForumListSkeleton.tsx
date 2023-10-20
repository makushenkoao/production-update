import { memo } from 'react';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const ForumListSkeleton = memo(() => {
    return (
        <VStack
            max
            gap="16"
        >
            {[1, 2, 3, 4].map((_, index) => (
                <Card
                    key={index}
                    max
                    border="round"
                    padding="24"
                >
                    <VStack
                        max
                        gap="16"
                    >
                        <HStack
                            max
                            justify="between"
                        >
                            <Skeleton
                                width={150}
                                height={25}
                                borderRadius="12px"
                            />
                            <HStack gap="4">
                                <Skeleton
                                    width={60}
                                    height={20}
                                    borderRadius="12px"
                                />
                                <Skeleton
                                    width={60}
                                    height={20}
                                    borderRadius="12px"
                                />
                                <Skeleton
                                    width={60}
                                    height={20}
                                    borderRadius="12px"
                                />
                            </HStack>
                        </HStack>
                        <HStack gap="4">
                            <Skeleton
                                width={24}
                                height={24}
                                borderRadius="50%"
                            />
                            <Skeleton
                                width={60}
                                height={18}
                                borderRadius="12px"
                            />
                        </HStack>
                        <Skeleton
                            height={50}
                            borderRadius="12px"
                        />
                    </VStack>
                </Card>
            ))}
        </VStack>
    );
});
