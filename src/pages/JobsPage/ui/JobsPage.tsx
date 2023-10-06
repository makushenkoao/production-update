import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const JobsPage = () => {
    const { t } = useTranslation();

    return <div>{t('Вакансії')}</div>;
};

export default memo(JobsPage);
