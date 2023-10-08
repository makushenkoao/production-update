import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { jobDetailsReducer } from '@/entities/Job';
import { Page } from '@/widgets/Page';
import { JobEdit } from './JobEdit/JobEdit';
import { JobCreate } from './JobCreate/JobCreate';

const reducers: ReducersList = {
    jobDetails: jobDetailsReducer,
};

const JobEditPage = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <Page>{id ? <JobEdit /> : <JobCreate />}</Page>
        </DynamicModuleLoader>
    );
};

export default memo(JobEditPage);
