import React from 'react';
import { useTranslation } from 'react-i18next';

import cls from './JobsFilters.module.scss';

import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Icon } from '@/shared/ui/redesigned/Icon';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useJobFilters } from '@/entities/Job';

export const JobsFilters = () => {
    const { t } = useTranslation();
    const { search, onChangeSearch } = useJobFilters();

    return (
        <Card
            border="round"
            padding="24"
            className={cls.card}
        >
            <VStack gap="32">
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('Пошук')}
                    size="s"
                    addonLeft={<Icon svg={SearchIcon} />}
                />
            </VStack>
        </Card>
    );
};
