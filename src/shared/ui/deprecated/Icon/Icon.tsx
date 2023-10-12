import React, { memo, SVGProps, VFC } from 'react';

import cls from './Icon.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    svg: VFC<SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
    const { className, svg: Svg, inverted, ...rest } = props;
    return (
        <Svg
            className={classNames(
                cls.Icon,
                {
                    [cls.inverted]: inverted,
                },
                [className],
            )}
            {...rest}
        />
    );
});
