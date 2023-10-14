import { FormEvent, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { JobFields } from '../JobFields/JobFields';

import { createJobService, FieldName, Job, JobCategory } from '@/entities/Job';
import { getUserAuthData } from '@/entities/User';
import { getRouteJobDetails } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const JobCreate = memo(() => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const authData = useSelector(getUserAuthData);
    const [formData, setFormData] = useState<Job>({
        id: String(Date.now()),
        title: '',
        salary: '',
        type: '',
        experience: '',
        description: '',
        responsibilities: '',
        requirements: '',
        category: [],
        company: '',
        aboutCompany: '',
        address: '',
        city: '',
        country: '',
        email: '',
        phone: '',
        website: '',
        userId: authData?.id,
        createdAt: Date.now(),
        views: 0,
        responses: [],
    });

    const handleInputChange = useCallback(
        (v: string, name: FieldName) => {
            setFormData({
                ...formData,
                [name]: v,
            });
        },
        [formData],
    );

    const handleChangeCategory = useCallback((c: JobCategory) => {
        setFormData((prev) => {
            if (prev.category.includes(c)) {
                return {
                    ...prev,
                    category: prev.category.filter((p) => p !== c),
                };
            }
            return {
                ...prev,
                category: [...prev.category, c],
            };
        });
    }, []);

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            setLoading(true);
            e.preventDefault();
            dispatch(createJobService(formData)).finally(() => {
                setLoading(false);
                navigate(getRouteJobDetails(formData.id));
            });
        },
        [dispatch, formData, navigate],
    );

    return (
        <VStack
            max
            gap="16"
        >
            <Text title={t('Створення вакансії')} />
            <JobFields
                formData={formData}
                handleInputChange={handleInputChange}
                handleChangeCategory={handleChangeCategory}
                onSubmit={onSubmit}
                loading={loading}
            />
        </VStack>
    );
});
