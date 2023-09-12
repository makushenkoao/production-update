import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@/widgets/Page';

const AdminPanelPage = () => {
    const { t } = useTranslation();

    return <Page data-testid="AdminPanelPage">{t('Адмін панель')}</Page>;
};

export default memo(AdminPanelPage);
