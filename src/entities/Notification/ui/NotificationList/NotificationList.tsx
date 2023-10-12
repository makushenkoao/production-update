import { memo } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Notification } from '../../model/types/notification';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

interface NotificationListProps {
    className?: string;
    notifications?: Notification[];
    error?: FetchBaseQueryError | SerializedError;
    isLoading?: boolean;
    onDeleteNotification?: (id?: string) => void;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className, notifications, isLoading, error, onDeleteNotification } =
        props;

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
            {notifications?.map((item) => (
                <NotificationItem
                    key={item.id}
                    item={item}
                    onDeleteNotification={onDeleteNotification}
                />
            ))}
        </VStack>
    );
});
