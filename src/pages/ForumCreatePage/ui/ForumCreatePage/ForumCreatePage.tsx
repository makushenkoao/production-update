import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

const ForumCreatePage = () => {
    const { t } = useTranslation();

    return <Page>{t('Сторінка редагування/створення форуму')}</Page>;
};

export default ForumCreatePage;
