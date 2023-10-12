import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './popularArticlesList.module.scss';

import { useGetPopularArticlesQuery } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

export const PopularArticlesList = memo(() => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetPopularArticlesQuery();

    if (isLoading) {
        return (
            <VStack
                gap="16"
                className={cls.PopularArticlesList}
            >
                <Skeleton height={30} />
                <VStack gap="16">
                    {[...Array(5)].map((_, index) => (
                        <Card
                            padding="0"
                            key={index}
                        >
                            <VStack gap="4">
                                <Skeleton
                                    width="100%"
                                    height={60}
                                />
                                <Skeleton
                                    width={80}
                                    height={20}
                                />
                            </VStack>
                        </Card>
                    ))}
                </VStack>
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            className={cls.PopularArticlesList}
        >
            <Text text={t('Популярне')} />
            <VStack gap="16">
                {data?.slice(0, 6).map((item) => (
                    <AppLink
                        key={item.id}
                        to={getRouteArticleDetails(item.id)}
                    >
                        <Card padding="0">
                            <VStack gap="4">
                                <AppImage
                                    src={item.img}
                                    width="100%"
                                />
                                <Text
                                    text={item.title}
                                    className={cls.title}
                                />
                            </VStack>
                        </Card>
                    </AppLink>
                ))}
            </VStack>
        </VStack>
    );
});
