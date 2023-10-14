import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import cls from '../JobAdditionalInfo.module.scss';

import { JobCategory, JobResponse } from '@/entities/Job';
import EyeIcon from '@/shared/assets/icons/eye-re.svg';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface JobVacancyAdditionalInfoProps {
    salary?: string;
    category?: JobCategory[];
    experience?: string;
    type?: string;
    views?: number;
    createdAt?: number;
    loading?: boolean;
    responses?: JobResponse[];
    country?: string;
    city?: string;
    address?: string;
}

export const JobVacancyAdditionalInfo = memo(
    (props: JobVacancyAdditionalInfoProps) => {
        const {
            salary,
            category,
            experience,
            type,
            views,
            createdAt,
            loading,
            country,
            city,
            address,
            responses,
        } = props;
        const { t } = useTranslation();

        if (loading) {
            return (
                <Card
                    padding="24"
                    border="round"
                    className={cls.card}
                >
                    <VStack gap="8">
                        <Skeleton height={30} />
                        <div className={cls.line} />
                        <Skeleton height={30} />
                        <div className={cls.line} />
                        <Skeleton height={30} />
                        <div className={cls.line} />
                        <Skeleton height={30} />
                        <div className={cls.line} />
                        <Skeleton height={30} />
                        <div className={cls.line} />
                        <Skeleton height={30} />
                        <HStack
                            max
                            justify="between"
                            className={cls.info}
                        >
                            <HStack gap="4">
                                <Skeleton
                                    width={32}
                                    height={32}
                                    borderRadius="50%"
                                />
                                <Skeleton
                                    width={80}
                                    height={30}
                                />
                            </HStack>
                            <Skeleton
                                width={80}
                                height={30}
                            />
                        </HStack>
                    </VStack>
                </Card>
            );
        }

        return (
            <Card
                padding="24"
                border="round"
                className={cls.card}
            >
                <VStack gap="8">
                    <Text text={t(`Зарплата: ${salary}`)} />
                    <div className={cls.line} />
                    <Text text={t(`Категорії: ${category?.join(', ')}`)} />
                    <div className={cls.line} />
                    <Text text={experience} />
                    <div className={cls.line} />
                    <Text text={`${country}, ${city}, ${address}`} />
                    <div className={cls.line} />
                    <Text text={type} />
                    <div className={cls.line} />
                    <Text
                        text={`${String(responses?.length)} ${
                            responses?.length === 1 ? 'Відгук' : 'Відгуків'
                        }`}
                    />
                    <HStack
                        max
                        justify="between"
                        className={cls.info}
                    >
                        <HStack gap="4">
                            <Icon svg={EyeIcon} />
                            <Text text={String(views)} />
                        </HStack>
                        <Text text={formatDate(createdAt)} />
                    </HStack>
                </VStack>
            </Card>
        );
    },
);
