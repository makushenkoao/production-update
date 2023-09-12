import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';


import { Button } from '@/shared/ui/redesigned/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { NotificationButton } from '@/features/notificationButton';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { AvatarDropdown } from '@/features/avatarDropdown';
import cls from './Navbar.module.scss';
import { getRouteMain } from '@/shared/const/router';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
    const userAuthData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const logo = (
        <AppLink to={getRouteMain()}>
            <Text
                theme={TextTheme.INVERTED}
                title={t('MAO')}
                className={cls.appName}
            />
        </AppLink>
    );

    if (userAuthData) {
        return (
            <header
                                    className={classNames(cls.NavbarRedesigned, {}, [
                                        className,
                                    ])}
                                >
                                    <HStack gap="16">
                                        <NotificationButton />
                                        <AvatarDropdown />
                                    </HStack>
                                </header>
        );
    }

    return (
        <header
            className={classNames(
                cls.NavbarRedesigned,
                {},
                [className],
            )}
        >
            <Button
                                    variant="clear"
                                    onClick={onShowModal}
                                >
                                    {t('Увійти')}
                                </Button>
            {isAuthModal && (
                <LoginModal
                    onClose={onCloseModal}
                    isOpen={isAuthModal}
                />
            )}
        </header>
    );
});
