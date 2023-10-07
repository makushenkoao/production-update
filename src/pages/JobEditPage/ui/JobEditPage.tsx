import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { jobDetailsReducer } from '@/entities/Job';
import { Page } from '@/widgets/Page';

const reducers: ReducersList = {
    jobDetails: jobDetailsReducer,
};

const JobEditPage = () => {
    const { t } = useTranslation();

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <Page>{t('Створення/редагування роботи')}</Page>
        </DynamicModuleLoader>
    );
};

export default memo(JobEditPage);
