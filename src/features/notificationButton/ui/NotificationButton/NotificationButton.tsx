import React, { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './NotificationButton.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
    NotificationList,
    deleteNotification,
    useGetNotificationsQuery,
} from '@/entities/Notification';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import NotificationIcon from '@/shared/assets/icons/notification-re.svg';
import { Tooltip } from '@/shared/ui/redesigned/Tooltip';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const { data, isLoading, error, refetch } = useGetNotificationsQuery(
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

    const onDeleteNotification = useCallback(
        async (id?: string) => {
            await dispatch(deleteNotification(id || ''));
            await refetch();
        },
        [dispatch, refetch],
    );

    const trigger = data?.length ? (
        <>
            <Tooltip title={t('Повідомлення')} direction="bottom left">
                <Icon
                    svg={NotificationIcon}
                    clickable
                    onClick={onOpenDrawer}
                    className={cls.icon}
                />
            </Tooltip>
            <Text
                text={String(data.length)}
                variant="error"
                className={cls.text}
            />
        </>
    ) : (
        <Tooltip title={t('Повідомлення')} direction="bottom left">
            <Icon
                svg={NotificationIcon}
                clickable
                onClick={onOpenDrawer}
                className={cls.icon}
            />
        </Tooltip>
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
