import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './RecentArticleList.module.scss';

import {
    ArticleList,
    ArticleView,
    useGetRecentArticlesQuery,
} from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const RecentArticlesList = memo(() => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetRecentArticlesQuery();

    return (
        <VStack
            gap="16"
            max
        >
            <Text title={t('Останні статті')} />
            <ArticleList
                articles={data?.slice(0, 10) || []}
                view={ArticleView.BIG}
                isLoading={isLoading}
                className={cls.max}
            />
        </VStack>
    );
});
