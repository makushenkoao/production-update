import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { jobsReducer } from '@/entities/Job';
import { Page } from '@/widgets/Page';

const reducers: ReducersList = {
    jobs: jobsReducer,
};

const JobsPage = () => {
    const { t } = useTranslation();

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page>{t('Вакансії')}</Page>
        </DynamicModuleLoader>
    );
};

export default memo(JobsPage);
