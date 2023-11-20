import React, { memo } from 'react';

import { ArticleListItemSkeletonProps } from '../ArticleListItemSkeleton';
import { ArticleView } from '../../../model/consts/consts';
import cls from './ArticleListItemRedesigned.module.scss';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const ArticleListItemRedesignedSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props;

        const userInfo = (
            <>
                <Skeleton
                    width={32}
                    height={32}
                    borderRadius="50%"
                />
                <Skeleton
                    width={50}
                    height={16}
                />
            </>
        );
        const views = (
            <HStack gap="8">
                <Skeleton
                    width={32}
                    height={32}
                    borderRadius="50%"
                />
                <Skeleton
                    width={50}
                    height={16}
                />
            </HStack>
        );

        if (view === ArticleView.BIG) {
            return (
                <Card
                    padding="24"
                    max
                    data-testid="ArticleListItem"
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <VStack
                        max
                        gap="16"
                    >
                        <HStack
                            gap="8"
                            max
                        >
                            {userInfo}
                            <Skeleton
                                width={100}
                                height={16}
                            />
                        </HStack>
                        <Skeleton
                            width={200}
                            height={20}
                        />
                        <Skeleton
                            width={150}
                            height={18}
                        />
                        <Skeleton
                            height={300}
                            className={cls.img}
                        />
                        <Skeleton height={80} />
                        <HStack
                            max
                            justify="between"
                        >
                            <Skeleton
                                width={100}
                                height={32}
                            />
                            {views}
                        </HStack>
                    </VStack>
                </Card>
            );
        }

        return (
            <div
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card
                    className={cls.card}
                    border="round"
                    padding="0"
                >
                    <Skeleton
                        height={140}
                        className={cls.img}
                    />
                    <VStack
                        className={cls.info}
                        gap="4"
                    >
                        <Skeleton
                            width={150}
                            height={32}
                        />
                        <VStack
                            gap="4"
                            className={cls.footer}
                            max
                        >
                            <HStack
                                justify="between"
                                max
                            >
                                <Skeleton
                                    width={80}
                                    height={16}
                                />
                                {views}
                            </HStack>
                            <HStack gap="4">{userInfo}</HStack>
                        </VStack>
                    </VStack>
                </Card>
            </div>
        );
    },
);
