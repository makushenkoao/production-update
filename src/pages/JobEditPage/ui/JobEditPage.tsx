import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { JobCreate } from './JobCreate/JobCreate';
import { JobEdit } from './JobEdit/JobEdit';

import { jobDetailsReducer } from '@/entities/Job';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';

const reducers: ReducersList = {
    jobDetails: jobDetailsReducer,
};

const JobEditPage = () => {
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
