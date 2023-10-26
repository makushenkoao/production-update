import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ForumAdditionalInfo.module.scss';

import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { useForumFilters } from '@/entities/Forum';

export const ForumAdditionalInfo = memo(() => {
    const { t } = useTranslation();
    const { search, onChangeSearch } = useForumFilters();

    return (
        <Card
            border="round"
            padding="24"
            className={cls.card}
        >
            <VStack
                max
                gap="16"
            >
                <Input
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t('Пошук')}
                />
            </VStack>
        </Card>
    );
});
