import { HTMLAttributes, memo, ReactNode } from 'react';

import cls from './Card.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

export type CardVariant = 'default' | 'outlined' | 'light';
export type CardPadding = '0' | '1' | '4' | '8' | '16' | '24';
export type CardBorder = 'round' | 'normal' | 'partial';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    max?: boolean;
    padding?: CardPadding;
    border?: CardBorder;
    fullHeight?: boolean;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'gap_0',
    '1': 'gap_1',
    '4': 'gap_4',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
};

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = 'default',
        max,
        padding = '8',
        border = 'normal',
        fullHeight,
        ...otherProps
    } = props;

    const paddingClass = mapPaddingToClass[padding];

    return (
        <div
            className={classNames(
                cls.Card,
                { [cls.max]: max, [cls.fullHeight]: fullHeight },
                [className, cls[variant], cls[paddingClass], cls[border]],
            )}
            {...otherProps}
        >
            {children}
        </div>
    );
});
