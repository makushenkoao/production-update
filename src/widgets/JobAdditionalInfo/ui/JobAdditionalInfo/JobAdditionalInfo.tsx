import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { JobAuthorAdditionalInfo } from './JobAuthorAdditionalInfo/JobAuthorAdditionalInfo';
import { JobCompanyAdditionalInfo } from './JobCompanyAdditionalInfo/JobCompanyAdditionalInfo';
import { JobVacancyAdditionalInfo } from './JobVacancyAdditionalInfo/JobVacancyAdditionalInfo';

import { deleteJobService, getJobsService, Job } from '@/entities/Job';
import { getUserAuthData } from '@/entities/User';
import {
    getRouteJobEdit,
    getRouteJobResponses,
    getRouteJobs,
} from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleAdditionalInfoProps {
    className?: string;
    job?: Job;
    loading?: boolean;
}

export const JobAdditionalInfo = memo((props: ArticleAdditionalInfoProps) => {
    const { className, job, loading } = props;
    const authData = useSelector(getUserAuthData);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onDelete = useCallback(async () => {
        await dispatch(deleteJobService(job?.id)).finally(() =>
            navigate(getRouteJobs()),
        );
        await dispatch(getJobsService({ replace: true }));
    }, [dispatch, job?.id, navigate]);

    const onEdit = useCallback(() => {
        if (job?.id) {
            navigate(getRouteJobEdit(job?.id));
        }
    }, [job?.id, navigate]);

    const onResponses = useCallback(() => {
        if (job?.id) {
            navigate(getRouteJobResponses(job?.id));
        }
    }, [job?.id, navigate]);

    return (
        <VStack
            max
            gap="16"
            className={classNames('', {}, [className])}
        >
            {authData?.id === job?.user?.id && (
                <JobAuthorAdditionalInfo
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onResponses={onResponses}
                    loading={loading}
                />
            )}
            <JobVacancyAdditionalInfo
                createdAt={job?.createdAt}
                views={job?.views}
                country={job?.country}
                city={job?.city}
                address={job?.address}
                experience={job?.experience}
                type={job?.type}
                category={job?.category}
                salary={job?.salary}
                loading={loading}
                responses={job?.responses}
            />
            <JobCompanyAdditionalInfo
                company={job?.company}
                email={job?.email}
                phone={job?.phone}
                website={job?.website}
                loading={loading}
            />
        </VStack>
    );
});
