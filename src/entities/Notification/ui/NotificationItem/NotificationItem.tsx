import { memo, useCallback } from 'react';

import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import DeleteIcon from '@/shared/assets/icons/delete.svg';

interface NotificationItemProps {
    className?: string;
    item: Notification;
    onDeleteNotification?: (id?: string) => void;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const {
        className,
        item: { id, href, title, description },
        onDeleteNotification,
    } = props;

    const onClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            onDeleteNotification?.(id);
        },
        [id, onDeleteNotification],
    );

    const content = (
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
            <Text
                title={title}
                text={description}
            />
            <Icon
                svg={DeleteIcon}
                className={cls.icon}
                clickable
                onClick={onClick}
            />
        </Card>
    );

    if (href) {
        return (
            <a
                className={cls.link}
                target="_blank"
                href={href}
                rel="noreferrer"
            >
                {content}
            </a>
        );
    }

    return content;
});
