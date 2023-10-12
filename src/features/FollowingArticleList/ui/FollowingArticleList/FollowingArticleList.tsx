import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    ArticleList,
    useGetFollowingArticlesQuery,
    ArticleView,
} from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { getUserAuthData } from '@/entities/User';
import { useGetProfileDataQuery } from '@/entities/Profile';

export const FollowingArticleList = () => {
    const authData = useSelector(getUserAuthData);

    const { t } = useTranslation();
    const { data: profile, isLoading: profileLoading } = useGetProfileDataQuery(
        authData?.id,
    );

    const { data, isLoading } = useGetFollowingArticlesQuery(
        profile?.following || [],
    );

    if (profileLoading || isLoading) {
        return (
            <ArticleList
                articles={[]}
                isLoading
                view={ArticleView.BIG}
            />
        );
    }

    if (!profile?.following?.length) return null;

    return (
        <VStack gap="16">
            <Text title={t('Статті відстежувальних користувачів')} />
            {data && data?.length > 0 && (
                <ArticleList
                    articles={data}
                    view={ArticleView.BIG}
                />
            )}
        </VStack>
    );
};
