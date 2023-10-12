import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getFeatureFlags, updateFeatureFlag } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isAppRedesigned = getFeatureFlags('isAppRedesigned');
    const authData = useSelector(getUserAuthData);

    const items = [
        {
            content: t('Новий'),
            value: 'new',
        },
        {
            content: t('Старий'),
            value: 'old',
        },
    ];

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);
            await dispatch(
                updateFeatureFlag({
                    userId: authData.id,
                    newFeatures: {
                        isAppRedesigned: value === 'new',
                    },
                }),
            ).unwrap();
            setIsLoading(false);
        }
    };

    return (
        <VStack gap="8">
            <Text text={t('Варіант інтерфейсу')} />
            {isLoading ? (
                <Skeleton
                    width={100}
                    height={40}
                />
            ) : (
                <ListBox
                    onChange={onChange}
                    value={isAppRedesigned ? 'new' : 'old'}
                    className={className}
                    items={items}
                />
            )}
        </VStack>
    );
});
