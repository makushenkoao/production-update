import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@/widgets/Page';

export const ForbiddenPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Page data-testid="ForbiddenPage">
            {t('У вас немає доступу до цієї сторінки')}
        </Page>
    );
});
