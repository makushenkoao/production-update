import { memo } from 'react';
import cls from './JobItem.module.scss';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteJobDetails } from '@/shared/const/router';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Job } from '../..';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIcon from '@/shared/assets/icons/eye-re.svg';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';
import { classNames } from '@/shared/lib/classNames/classNames';

interface JobItemProps {
    className?: string;
    job?: Job;
}

export const JobItem = memo((props: JobItemProps) => {
    const { job, className } = props;

    if (!job) return null;

    return (
        <AppLink
            to={getRouteJobDetails(job.id)}
            max
            className={classNames(cls.card, {}, [className])}
        >
            <Card
                border="round"
                max
                padding="24"
            >
                <VStack
                    max
                    gap="16"
                >
                    <HStack
                        max
                        justify="between"
                    >
                        <Text title={job.title} />
                        <HStack gap="4">
                            <Icon svg={EyeIcon} />
                            <Text text={String(job.views)} />
                        </HStack>
                    </HStack>
                    <HStack
                        gap="8"
                        wrap="wrap"
                    >
                        <Text text={job.salary} />
                        <Text text="|" />
                        <Text text={job.type} />
                        <Text text="|" />
                        <Text text={job.experience} />
                        <Text text="|" />
                        <Text text={job.location} />
                        <Text text="|" />
                        <Text text={job.company} />
                    </HStack>

                    <Text text={`Категорії: ${job.category.join(' | ')}`} />
                    <HStack
                        max
                        justify="end"
                    >
                        <Text text={formatDate(job.createdAt)} />
                    </HStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
