import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useInteractive } from '@/shared/lib/hooks/useInteractive/useInteractive';
import { useGetQuotesQuery } from '@/entities/Interactive';
import { InteractiveTaskPageSkeleton } from '../InteractiveTaskPageSkeleton';

export const Quote = memo(() => {
    const { data, isLoading } = useGetQuotesQuery();
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
            <Text
                title={t('Цитата дня')}
                text={t(`${data?.[currentIndex].text}`)}
            />
            <HStack
                max
                justify="end"
            >
                <Text text={t(`© ${data?.[currentIndex].author}`)} />
            </HStack>
        </VStack>
    );
});
