import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const JobEditPage = () => {
    const { t } = useTranslation();

    return <div>{t('Створення/редагування роботи')}</div>;
};

export default memo(JobEditPage);
