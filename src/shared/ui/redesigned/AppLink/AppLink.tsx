import { LinkProps, NavLink } from 'react-router-dom';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

import cls from './AppLink.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    activeClassName?: string;
    max?: boolean;
}

export const AppLink = forwardRef(
    (props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
        const {
            to,
            className,
            children,
            variant = 'primary',
            activeClassName = '',
            max,
            ...otherProps
        } = props;

        return (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    classNames(
                        cls.AppLink,
                        { [activeClassName]: isActive, [cls.max]: max },
                        [className, cls[variant]],
                    )
                }
                ref={ref}
                {...otherProps}
            >
                {children}
            </NavLink>
        );
    },
);
