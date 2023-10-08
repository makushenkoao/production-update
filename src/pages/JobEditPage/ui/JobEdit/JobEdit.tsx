import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getJobDetailsData, getJobDetailsIsLoading } from '@/entities/Job';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const JobEdit = memo(() => {
    const { t } = useTranslation();
    const job = useSelector(getJobDetailsData);
    const loading = useSelector(getJobDetailsIsLoading);

    return (
        <VStack
            max
            gap="16"
        >
            <Text title={t('Редагування вакансії')} />
        </VStack>
    );
});
