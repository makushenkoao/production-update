import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { JobCategory } from '@/shared/const/job';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { JobAuthorAdditionalInfo } from './JobAuthorAdditionalInfo/JobAuthorAdditionalInfo';
import { getRouteJobEdit } from '@/shared/const/router';
import { JobVacancyAdditionalInfo } from './JobVacancyAdditionalInfo/JobVacancyAdditionalInfo';
import { JobCompanyAdditionalInfo } from './JobCompanyAdditionalInfo/JobCompanyAdditionalInfo';

interface ArticleAdditionalInfoProps {
    className?: string;
    salary: string;
    category: JobCategory[];
    experience: string;
    type: string;
    location: string;
    views: number;
    createdAt: number;
    email: string;
    phone: string;
    website?: string;
    company: string;
    id: string;
}

export const JobAdditionalInfo = memo((props: ArticleAdditionalInfoProps) => {
    const {
        className,
        salary,
        category,
        experience,
        location,
        type,
        createdAt,
        email,
        phone,
        website,
        views,
        company,
        id,
    } = props;
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const navigate = useNavigate();

    const onDelete = useCallback(() => {
        console.log(`Delete job - ${id}`);
    }, [id]);

    const onEdit = useCallback(() => {
        navigate(getRouteJobEdit(id));
    }, [id, navigate]);

    return (
        <VStack
            max
            gap="16"
            className={classNames('', {}, [className])}
        >
            {authData?.id === id && (
                <JobAuthorAdditionalInfo
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            )}
            <JobVacancyAdditionalInfo
                createdAt={createdAt}
                views={views}
                location={location}
                experience={experience}
                type={type}
                category={category}
                salary={salary}
            />
            <JobCompanyAdditionalInfo
                company={company}
                email={email}
                phone={phone}
                website={website}
            />
        </VStack>
    );
});
