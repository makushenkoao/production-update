import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from '../ArchiveArticlesPage.module.scss';

export const ArchiveArticlesLoading = memo(() => {
    return (
        <HStack
            gap="16"
            max
            wrap="wrap"
        >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <Card
                    padding="0"
                    className={cls.card}
                    border="round"
                    key={n}
                >
                    <Skeleton
                        width="100%"
                        height={200}
                    />
                    <VStack
                        className={cls.info}
                        gap="4"
                    >
                        <HStack
                            max
                            justify="between"
                            gap="16"
                        >
                            <Skeleton
                                width={80}
                                height={20}
                            />
                            <HStack gap="4">
                                <Skeleton
                                    width={32}
                                    height={32}
                                    borderRadius="50%"
                                />
                                <Skeleton
                                    width={50}
                                    height={20}
                                />
                            </HStack>
                        </HStack>
                        <Skeleton
                            width="100%"
                            height={32}
                            borderRadius="12px"
                        />
                    </VStack>
                </Card>
            ))}
        </HStack>
    );
});
