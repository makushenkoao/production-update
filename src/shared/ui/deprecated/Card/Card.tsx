import { HTMLAttributes, memo, ReactNode } from 'react';

import cls from './Card.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    max?: boolean;
}

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        max,
        ...rest
    } = props;

    return (
        <div
            className={classNames(
                cls.Card,
                {
                    [cls.max]: max,
                },
                [className, cls[theme]],
            )}
            {...rest}
        >
            {children}
        </div>
    );
});
