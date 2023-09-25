import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';
import { useGetProfileDataQuery } from '@/entities/Profile';
import { Article, ArticleList, useGetArticlesQuery } from '@/entities/Article';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

const SavedArticles = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { data: profile, isLoading, error } = useGetProfileDataQuery(id);
    const { data: articles, isLoading: isLoadingArticle } =
        useGetArticlesQuery();

    const savedArticles = profile?.saved || [];

    if (isLoading || isLoadingArticle) {
        return (
            <VStack
                max
                gap="16"
            >
                <Skeleton
                    height={32}
                    width={200}
                />
                <HStack
                    wrap="wrap"
                    gap="16"
                >
                    {Array.from({ length: 12 }, (_, index) => (
                        <Skeleton
                            key={index}
                            width={250}
                            height={250}
                            borderRadius="12"
                        />
                    ))}
                </HStack>
            </VStack>
        );
    }

    if (!savedArticles.length) {
        return (
            <Page data-testid="SavedArticles">
                <Text
                    title={t('Збережені статті')}
                    text={t('Ви ще не зберегли жодної статті')}
                />
            </Page>
        );
    }

    const savedArticle = articles?.filter((article) =>
        savedArticles.includes(article?.id),
    ) as Article[];

    return (
        <Page data-testid="SavedArticles">
            <VStack
                max
                gap="16"
            >
                <Text title={t('Збережені статті')} />
                <ArticleList
                    articles={savedArticle}
                    isLoading={isLoading}
                />
            </VStack>
        </Page>
    );
};

export default SavedArticles;
