import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { InteractiveTaskPageSkeleton } from '../InteractiveTaskPageSkeleton';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useGetRecipesQuery, useInteractive } from '@/entities/Interactive';

export const Recipe = memo(() => {
    const { data, isLoading } = useGetRecipesQuery();
    const { t } = useTranslation();
    const { currentIndex } = useInteractive(data);

    if (isLoading) {
        return <InteractiveTaskPageSkeleton />;
    }

    return (
        <VStack
            max
            gap="8"
        >
            <Text title={t('Рецепт')} />
            <Text
                text={t(`${data?.[currentIndex].title}`)}
                bold
            />
            <Text
                text={t('Інгредиенти')}
                bold
            />
            <ul>
                {data?.[currentIndex].ingredients.map((text) => (
                    <li>
                        <Text text={t(`${text}`)} />
                    </li>
                ))}
            </ul>
            <Text
                text={t('Інструкція')}
                bold
            />
            <ul>
                {data?.[currentIndex].instruction.map((text) => (
                    <li>
                        <Text text={t(`${text}`)} />
                    </li>
                ))}
            </ul>
        </VStack>
    );
});
