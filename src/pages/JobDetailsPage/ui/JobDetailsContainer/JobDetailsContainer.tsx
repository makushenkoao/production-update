import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { AvatarWithUsername } from '@/shared/ui/redesigned/AvatarWithUsername';
import { Job } from '@/entities/Job';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface JobDetailsContainerProps {
    className?: string;
    job?: Job;
    loading?: boolean;
}

export const JobDetailsContainer = memo((props: JobDetailsContainerProps) => {
    const { job, className, loading } = props;
    const { t } = useTranslation();

    if (loading) {
        return (
            <Card
                padding="24"
                border="round"
                max
                className={classNames('', {}, [className])}
            >
                <VStack
                    max
                    gap="16"
                >
                    <Skeleton
                        width={300}
                        height={30}
                    />
                    <HStack gap="8">
                        <Skeleton
                            width={32}
                            height={32}
                            borderRadius="50%"
                        />
                        <Skeleton
                            width={80}
                            height={20}
                        />
                    </HStack>
                    <Skeleton height={80} />
                    <Skeleton height={80} />
                    <Skeleton height={80} />
                    <Skeleton height={80} />
                </VStack>
            </Card>
        );
    }

    if (!job) return null;

    return (
        <Card
            padding="24"
            border="round"
            max
            className={classNames('', {}, [className])}
        >
            <VStack
                max
                gap="16"
            >
                <Text title={job.title} />
                <AppLink to={getRouteProfile(job.user.id)}>
                    <AvatarWithUsername
                        src={job.user.avatar}
                        username={job.user.username}
                        size={30}
                    />
                </AppLink>
                <Text
                    title={t('Опис')}
                    text={job.description}
                />
                <Text
                    title={t("Обов'зки")}
                    text={job.responsibilities}
                />
                <Text
                    title={t('Вимоги')}
                    text={job.requirements}
                />
                <Text
                    title={t('Про компанію')}
                    text={job.aboutCompany}
                />
            </VStack>
        </Card>
    );
});
