import { memo, ReactNode } from 'react';
import { Popover as HPopover } from '@headlessui/react';

import { mapDirectionClass } from '../../styles/consts';
import cls from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';

import { DropdownDirection } from '@/shared/types/ui';
import { classNames } from '@/shared/lib/classNames/classNames';

interface PopoverProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropdownDirection;
    children: ReactNode;
}

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const Popover = memo((props: PopoverProps) => {
    const { className, trigger, direction = 'bottom right', children } = props;

    const menuClasses = [mapDirectionClass[direction], className];
    return (
        <HPopover className={classNames('', {}, [className, popupCls.popup])}>
            <HPopover.Button
                as="div"
                className={popupCls.trigger}
            >
                {trigger}
            </HPopover.Button>
            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
});
