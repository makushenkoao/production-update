import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Text } from '@/shared/ui/redesigned/Text';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getRouteAdmin,
    getRouteProfile,
    getRouteSavedArticles,
    getRouteSettings,
} from '@/shared/const/router';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const userAuthData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!userAuthData) {
        return null;
    }

    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t('Адмінка'),
                      href: getRouteAdmin(),
                  },
              ]
            : []),
        {
            content: t('Профіль'),
            href: getRouteProfile(userAuthData.id),
        },
        {
            content: t('Збережені'),
            href: getRouteSavedArticles(userAuthData.id),
        },
        {
            content: t('Налаштування'),
            href: getRouteSettings(),
        },
        {
            content: (
                <Text
                    align="center"
                    text={t('Вийти')}
                    variant="error"
                />
            ),
            onClick: onLogout,
        },
    ];

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            items={items}
            trigger={
                <Avatar
                    src={userAuthData.avatar}
                    height={30}
                    width={30}
                    alt="User"
                />
            }
            direction="bottom left"
        />
    );
});
