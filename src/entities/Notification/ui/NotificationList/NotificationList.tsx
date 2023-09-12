import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { useGetNotificationsQuery } from '../../api/notifictionApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const { data, isLoading, error } = useGetNotificationsQuery(null, {
        pollingInterval: 5000,
    });

    const Skeleton = SkeletonRedesigned;

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames('', {}, [className])}
            >
                <Skeleton
                    width="100%"
                    borderRadius="8px"
                    height="80px"
                />
                <Skeleton
                    width="100%"
                    borderRadius="8px"
                    height="80px"
                />
                <Skeleton
                    width="100%"
                    borderRadius="8px"
                    height="80px"
                />
            </VStack>
        );
    }

    if (error) {
        // TODO - error
        return null;
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames('', {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem
                    key={item.id}
                    item={item}
                />
            ))}
        </VStack>
    );
});
