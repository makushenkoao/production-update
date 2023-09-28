import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useInteractive } from '@/shared/lib/hooks/useInteractive/useInteractive';
import { useGetTasksQuery } from '@/entities/Interactive';
import { InteractiveTaskPageSkeleton } from '../InteractiveTaskPageSkeleton';

export const Task = memo(() => {
    const { data, isLoading } = useGetTasksQuery();
    const { t } = useTranslation();
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
                title={t('Завдання дня')}
                text={t(`${data?.[currentIndex]}`)}
            />
        </VStack>
    );
});
