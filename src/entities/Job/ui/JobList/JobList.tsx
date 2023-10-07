import { memo } from 'react';
import { Job } from '../..';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { JobItem } from '../JobItem/JobItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface JobListProps {
    className?: string;
    jobs?: Job[];
    isLoading?: boolean;
}

export const JobList = memo((props: JobListProps) => {
    const { className, jobs, isLoading } = props;

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames('', {}, [className])}
            >
                {[1, 2, 3].map((item, index) => (
                    <Card
                        border="round"
                        max
                        padding="24"
                        key={index}
                    >
                        <VStack
                            max
                            gap="16"
                        >
                            <HStack
                                max
                                justify="between"
                            >
                                <Skeleton
                                    width={100}
                                    height={30}
                                />
                                <HStack gap="4">
                                    <Skeleton
                                        width={32}
                                        height={32}
                                        borderRadius="50%"
                                    />
                                    <Skeleton
                                        width={50}
                                        height={20}
                                    />
                                </HStack>
                            </HStack>
                            <Skeleton height={100} />
                            <Skeleton height={30} />
                            <HStack
                                max
                                justify="end"
                            >
                                <Skeleton
                                    width={80}
                                    height={20}
                                />
                            </HStack>
                        </VStack>
                    </Card>
                ))}
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames('', {}, [className])}
        >
            {jobs?.map((job) => (
                <JobItem
                    key={job.id}
                    job={job}
                />
            ))}
        </VStack>
    );
});
