import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    getJobsError,
    getJobsIsLoading,
    getNextJobsService,
    initJobsService,
    JobList,
    jobsReducer,
    getJobs
} from '@/entities/Job';
import { Page } from '@/widgets/Page';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { JobsFilters } from '@/widgets/JobsFilters';

const reducers: ReducersList = {
    jobs: jobsReducer,
};

const JobsPage = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const jobs = useSelector(getJobs.selectAll);
    const dispatch = useAppDispatch();
    const loading = useSelector(getJobsIsLoading);
    const error = useSelector(getJobsError);

    const onLoadNextPart = useCallback(() => {
        dispatch(getNextJobsService());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initJobsService(searchParams));
    });

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <StickyContentLayout
                content={
                    <Page onScrollEnd={onLoadNextPart}>
                        <JobList
                            jobs={jobs}
                            isLoading={loading}
                        />
                    </Page>
                }
                right={<JobsFilters />}
            />
        </DynamicModuleLoader>
    );
};

export default memo(JobsPage);
