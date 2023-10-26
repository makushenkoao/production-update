import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { InteractiveTaskPageSkeleton } from '../InteractiveTaskPageSkeleton';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useInteractive } from '@/shared/lib/hooks/useInteractive/useInteractive';
import { useGetAdvicesQuery } from '@/entities/Interactive';

export const Advice = memo(() => {
    const { data, isLoading } = useGetAdvicesQuery();
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
            <Text title={t('Порада')} />
            <Text
                title={t(`${data?.[currentIndex].title}`)}
                size="s"
            />
            <Text text={t(`${data?.[currentIndex].description}`)} />
            <Text
                text={t(
                    'Слідуючи цим простим порадам, ви швидко помітите позитивні зміни!',
                )}
                bold
            />
        </VStack>
    );
});
