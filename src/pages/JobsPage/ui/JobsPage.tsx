import React, { memo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    getJobs,
    getJobsError,
    getJobsIsLoading,
    getNextJobsService,
    initJobsService,
    JobList,
    jobsReducer,
} from '@/entities/Job';
import { Page } from '@/widgets/Page';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { JobsFilters } from '@/widgets/JobsFilters';
import { Icon } from '@/shared/ui/redesigned/Icon';
import PlusIcon from '@/shared/assets/icons/create.svg';
import { getRouteJobCreate } from '@/shared/const/router';
import { Tooltip } from '@/shared/ui/redesigned/Tooltip';

const reducers: ReducersList = {
    jobs: jobsReducer,
};

const JobsPage = () => {
    const [searchParams] = useSearchParams();
    const { t } = useTranslation();
    const jobs = useSelector(getJobs.selectAll);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useSelector(getJobsIsLoading);
    const error = useSelector(getJobsError);

    const onLoadNextPart = useCallback(() => {
        dispatch(getNextJobsService());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initJobsService(searchParams));
    });

    const onNavigate = useCallback(() => {
        navigate(getRouteJobCreate());
    }, [navigate]);

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
                left={
                    <Tooltip title={t('Створити вакансію')}>
                        <Icon
                            svg={PlusIcon}
                            clickable
                            onClick={onNavigate}
                        />
                    </Tooltip>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(JobsPage);
