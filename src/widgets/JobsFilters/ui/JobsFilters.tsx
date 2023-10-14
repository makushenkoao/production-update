import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import cls from './JobsFilters.module.scss';

import { useJobFilters } from '@/entities/Job';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { getRouteJobMap } from '@/shared/const/router';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';

export const JobsFilters = () => {
    const { t } = useTranslation();
    const { search, onChangeSearch } = useJobFilters();
    const navigate = useNavigate();

    const onClick = useCallback(() => {
        navigate(getRouteJobMap());
    }, [navigate]);

    return (
        <Card
            border="round"
            padding="24"
            className={cls.card}
        >
            <VStack gap="16">
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('Пошук')}
                    size="s"
                    addonLeft={<Icon svg={SearchIcon} />}
                />
                <Button
                    onClick={onClick}
                    fullWidth
                >
                    {t('Пошук на карті')}
                </Button>
            </VStack>
        </Card>
    );
};
