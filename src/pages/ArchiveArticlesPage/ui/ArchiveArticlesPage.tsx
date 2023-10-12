import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArchiveArticleList } from './ArchiveArticleList/ArchiveArticleList';

import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

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
