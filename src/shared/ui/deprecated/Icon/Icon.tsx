import React, { memo, SVGProps, VFC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

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
