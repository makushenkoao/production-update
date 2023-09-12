import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    useGetArticlesQuery,
    ArticleList,
    ArticleView,
} from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const RecentArticlesList = () => {
    const { t } = useTranslation();
    const { data, isLoading, error } = useGetArticlesQuery();

    const recentArticles = data
        ? [...data].sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)
        : [];

    if (!recentArticles) return null;

    return (
        <VStack gap="16">
            <Text title={t('Свіжі статті')} />
            <ArticleList
                articles={recentArticles}
                view={ArticleView.BIG}
                isLoading={isLoading}
            />
        </VStack>
    );
};
