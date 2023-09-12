import { memo, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    children: ReactNode;
    theme?: AppLinkTheme;
}

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const AppLink = memo((props: AppLinkProps) => {
    const {
        className = '',
        children,
        to,
        theme = AppLinkTheme.PRIMARY,
        ...rest
    } = props;
    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            {...rest}
        >
            {children}
        </Link>
    );
});
