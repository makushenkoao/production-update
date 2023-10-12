import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SidebarItemTypes } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { Icon } from '@/shared/ui/redesigned/Icon';


interface SidebarItemProps {
    item: SidebarItemTypes;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();

    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            to={item.path}
            className={classNames(cls.SidebarItemRedesigned, {
                [cls.collapsedRedesigned]: collapsed,
            })}
            activeClassName={cls.active}
        >
            <Icon svg={item.icon} />
            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    );
});
