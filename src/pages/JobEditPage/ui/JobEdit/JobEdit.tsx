import { FormEvent, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
    FieldName,
    getJobDetailsData,
    Job,
    updateJobService,
} from '@/entities/Job';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { JobCategory } from '@/shared/const/job';
import { getRouteJobDetails } from '@/shared/const/router';
import { JobFields } from '../JobFields/JobFields';

export const JobEdit = memo(() => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const job = useSelector(getJobDetailsData);

    const [formData, setFormData] = useState<Job>({
        ...(job || ({} as Job)),
        user: undefined,
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
            dispatch(updateJobService(formData)).finally(() => {
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
            <Text title={t('Редагування вакансії')} />
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
