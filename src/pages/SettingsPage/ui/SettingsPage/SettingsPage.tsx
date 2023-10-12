import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteAccountButton } from './DeleteAccountButton/DeleteAccountButton';

import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

const SettingsPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <VStack
                max
                gap="16"
            >
                <Text title={t('Налаштування користувача')} />
                <DeleteAccountButton />
            </VStack>
        </Page>
    );
};

export default memo(SettingsPage);
