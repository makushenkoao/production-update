import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { JobAdditionalInfo } from '@/widgets/JobAdditionalInfo';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { JobFeedbackForm } from './JobFeedbackForm/JobFeedbackForm';
import { JobDetailsContainer } from './JobDetailsContainer/JobDetailsContainer';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    getJobDetailsData,
    getJobDetailsIsLoading,
    getJobDetailsService,
    jobDetailsReducer,
} from '@/entities/Job';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getUserAuthData } from '@/entities/User';

const reducers: ReducersList = {
    jobDetails: jobDetailsReducer,
};

const JobDetailsPage = () => {
    const { id } = useParams<{ id?: string }>();
    const dispatch = useAppDispatch();
    const job = useSelector(getJobDetailsData);
    const loading = useSelector(getJobDetailsIsLoading);
    const authData = useSelector(getUserAuthData);

    useInitialEffect(() => {
        dispatch(getJobDetailsService(id));
    });

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
                            <JobDetailsContainer
                                job={job}
                                loading={loading}
                            />
                            {job?.user?.id !== authData?.id && (
                                <JobFeedbackForm loading={loading} />
                            )}
                        </VStack>
                    </Page>
                }
                right={
                    <JobAdditionalInfo
                        job={job}
                        loading={loading}
                    />
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(JobDetailsPage);
