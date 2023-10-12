import { memo, ReactNode } from 'react';

import cls from './Tooltip.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

type TooltipDirection =
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right';

interface TooltipProps {
    children: ReactNode;
    className?: string;
    title?: string;
    direction?: TooltipDirection;
}

export const Tooltip = memo((props: TooltipProps) => {
    const { children, className, title, direction = 'bottom right' } = props;

    const mapDirectionClass: Record<DropdownDirection, string> = {
        'bottom left': cls.bottomLeft,
        'bottom right': cls.bottomRight,
        'top right': cls.topRight,
        'top left': cls.topLeft,
    };

    const menuClasses = mapDirectionClass[direction];

    return (
        <div className={classNames(cls.Tooltip, {}, [className])}>
            {children}
            <p className={classNames(cls.title, {}, [menuClasses])}>{title}</p>
        </div>
    );
});
