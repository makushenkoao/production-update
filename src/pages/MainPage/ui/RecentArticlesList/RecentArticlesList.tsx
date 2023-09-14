import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Article, ArticleList, ArticleView } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface RecentArticlesListProps {
    articles?: Article[];
    isLoading?: boolean;
}

export const RecentArticlesList = memo((props: RecentArticlesListProps) => {
    const { articles, isLoading } = props;
    const { t } = useTranslation();

    const recentArticles = articles
        ? [...articles].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10)
        : [];

    if (!recentArticles) return null;

    return (
        <VStack gap="16">
            <Text title={t('Останні статті')} />
            <ArticleList
                articles={recentArticles}
                view={ArticleView.BIG}
                isLoading={isLoading}
            />
        </VStack>
    );
});
