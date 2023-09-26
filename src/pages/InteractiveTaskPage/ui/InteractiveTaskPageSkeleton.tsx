import React from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Card } from '@/shared/ui/redesigned/Card';
import { Page } from '@/widgets/Page';
import cls from './InteractiveTaskPage.module.scss';

export const InteractiveTaskPageSkeleton = () => {
    return (
        <Page className={cls.page}>
            <VStack
                max
                gap="16"
            >
                <Skeleton
                    width={200}
                    height={30}
                    borderRadius="34px"
                />
                <Card
                    padding="16"
                    className={cls.card}
                >
                    <VStack
                        max
                        gap="16"
                    >
                        <Skeleton
                            width={200}
                            height={30}
                        />

                        <Skeleton
                            width={500}
                            height={50}
                        />
                        <Skeleton
                            width={500}
                            height={50}
                        />
                        <Skeleton
                            width={500}
                            height={50}
                        />
                    </VStack>
                </Card>
            </VStack>
        </Page>
    );
};
