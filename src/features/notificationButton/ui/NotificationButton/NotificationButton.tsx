import React, { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import {
    NotificationList,
    useGetNotificationsQuery,
} from '@/entities/Notification';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Icon } from '@/shared/ui/redesigned/Icon';
import NotificationIcon from '@/shared/assets/icons/notification-re.svg';
import cls from './NotificationButton.module.scss';
import { Popover } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';
import { getUserAuthData } from '@/entities/User';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const { data, isLoading, error } = useGetNotificationsQuery(
        authData?.id || '',
        {
            pollingInterval: 5000,
        },
    );
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onDeleteNotification = useCallback((id?: string) => {
        console.log(`delete notification with id ${id}`);
    }, []);

    const trigger = data?.length ? (
        <>
            <Icon
                svg={NotificationIcon}
                clickable
                onClick={onOpenDrawer}
                className={cls.icon}
            />
            <Text
                text={String(data.length)}
                variant="error"
                className={cls.text}
            />
        </>
    ) : (
        <Icon
            svg={NotificationIcon}
            clickable
            onClick={onOpenDrawer}
            className={cls.icon}
        />
    );

    return (
        <div>
            <BrowserView>
                <Popover
                    className={classNames(cls.NotificationButton, {}, [
                        className,
                    ])}
                    direction="bottom left"
                    trigger={trigger}
                >
                    <NotificationList
                        notifications={data}
                        isLoading={isLoading}
                        error={error}
                        className={cls.notifications}
                        onDeleteNotification={onDeleteNotification}
                    />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer
                    isOpen={isOpen}
                    onClose={onCloseDrawer}
                >
                    <NotificationList
                        notifications={data}
                        isLoading={isLoading}
                        error={error}
                        onDeleteNotification={onDeleteNotification}
                    />
                </Drawer>
            </MobileView>
        </div>
    );
});
