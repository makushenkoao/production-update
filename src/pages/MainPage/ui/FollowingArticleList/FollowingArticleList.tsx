import React from 'react';
import { useTranslation } from 'react-i18next';
import { Article, ArticleList, ArticleView } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface FollowingArticleListProps {
    articles?: Article[];
    isLoading?: boolean;
    followingIds?: string[];
}

export const FollowingArticleList = (props: FollowingArticleListProps) => {
    const { articles, isLoading, followingIds } = props;
    const { t } = useTranslation();

    const followingArticles =
        articles
            ?.filter((article) => followingIds?.includes(article.user.id))
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
            ) || [];

    return (
        <VStack gap="16">
            <Text title={t('Статті відстежувальних користувачів')} />
            <ArticleList
                articles={followingArticles}
                view={ArticleView.BIG}
                isLoading={isLoading}
            />
        </VStack>
    );
};
