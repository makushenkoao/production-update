import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { JobAdditionalInfo } from '@/widgets/JobAdditionalInfo';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { JobFeedbackForm } from './JobFeedbackForm/JobFeedbackForm';
import { JobDetailsContainer } from './JobDetailsContainer/JobDetailsContainer';
import { JOB_MOCK_DATA } from '../model/const/job_details';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { jobDetailsReducer } from '@/entities/Job';

const reducers: ReducersList = {
    jobDetails: jobDetailsReducer,
};

const JobDetailsPage = () => {
    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <StickyContentLayout
                content={
                    <Page>
                        <VStack
                            max
                            gap="32"
                        >
                            <JobDetailsContainer />
                            <JobFeedbackForm />
                        </VStack>
                    </Page>
                }
                right={
                    <JobAdditionalInfo
                        salary={JOB_MOCK_DATA.salary}
                        category={JOB_MOCK_DATA.category}
                        type={JOB_MOCK_DATA.type}
                        experience={JOB_MOCK_DATA.experience}
                        location={JOB_MOCK_DATA.location}
                        views={300}
                        createdAt={Date.now()}
                        email={JOB_MOCK_DATA.email}
                        phone={JOB_MOCK_DATA.phone}
                        website={JOB_MOCK_DATA.website}
                        company={JOB_MOCK_DATA.company}
                        id={JOB_MOCK_DATA.id}
                    />
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(JobDetailsPage);
