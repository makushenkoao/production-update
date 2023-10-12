import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { InteractiveTaskPageSkeleton } from '../InteractiveTaskPageSkeleton';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useInteractive } from '@/shared/lib/hooks/useInteractive/useInteractive';
import { useGetFactsQuery } from '@/entities/Interactive';

export const Fact = memo(() => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetFactsQuery();
    const { currentIndex } = useInteractive(data);

    if (isLoading) {
        return <InteractiveTaskPageSkeleton />;
    }

    return (
        <VStack
            max
            gap="16"
        >
            <Text
                title={t('Факт дня')}
                text={t(`А ви знали, що... ${data?.[currentIndex].content}`)}
            />
        </VStack>
    );
});
