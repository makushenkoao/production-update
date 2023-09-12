import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const {
        className,
        item: { id, href, title, description },
    } = props;

    const content = (
        <Card
                            className={classNames(cls.NotificationItem, {}, [
                                className,
                            ])}
                        >
                            <Text
                                title={title}
                                text={description}
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
