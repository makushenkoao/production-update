import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

const JobsMapPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <VStack
                max
                gap="16"
            >
                <Text title={t('Пошук вакансій на мапі')} />
            </VStack>
        </Page>
    );
};

export default memo(JobsMapPage);
