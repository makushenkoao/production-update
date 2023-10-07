import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { JobAuthorAdditionalInfo } from './JobAuthorAdditionalInfo/JobAuthorAdditionalInfo';
import { getRouteJobEdit, getRouteJobs } from '@/shared/const/router';
import { JobVacancyAdditionalInfo } from './JobVacancyAdditionalInfo/JobVacancyAdditionalInfo';
import { JobCompanyAdditionalInfo } from './JobCompanyAdditionalInfo/JobCompanyAdditionalInfo';
import { deleteJobService, getJobsService, Job } from '@/entities/Job';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

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

    return (
        <VStack
            max
            gap="16"
            className={classNames('', {}, [className])}
        >
            {authData?.id === job?.user.id && (
                <JobAuthorAdditionalInfo
                    onDelete={onDelete}
                    onEdit={onEdit}
                    loading={loading}
                />
            )}
            <JobVacancyAdditionalInfo
                createdAt={job?.createdAt}
                views={job?.views}
                location={job?.location}
                experience={job?.experience}
                type={job?.type}
                category={job?.category}
                salary={job?.salary}
                loading={loading}
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
