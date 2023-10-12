import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArchiveArticleList } from './ArchiveArticleList/ArchiveArticleList';

const ArchiveArticlesPage = () => {
    const { t } = useTranslation();

    return (
        <VStack
            max
            gap="16"
        >
            <Text title={t('Архів')} />
            <ArchiveArticleList />
        </VStack>
    );
};

export default memo(ArchiveArticlesPage);
