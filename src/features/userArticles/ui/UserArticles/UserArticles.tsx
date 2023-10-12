import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
    ArticleList,
    ArticleView,
    useGetArticlesQuery,
} from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const UserArticles = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const { data, isLoading, error } = useGetArticlesQuery();

    const userArticles = data?.filter((item) => item.user.id === id);

    if (isLoading) {
        return <Skeleton height={300} />;
    }

    if (!userArticles || !userArticles.length) {
        return (
            <VStack gap="16">
                <Text
                    title={t('Статті користувача')}
                    text={t('Користувач ще не опублікував жодної статті')}
                />
            </VStack>
        );
    }

    return (
        <VStack gap="16">
            <Text title={t('Статті користувача')} />
            <ArticleList
                articles={userArticles}
                isLoading={isLoading}
                view={ArticleView.BIG}
            />
        </VStack>
    );
};
