import { CSSProperties, memo } from 'react';

import cls from './Skeleton.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    borderRadius?: string;
}

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const Skeleton = memo((props: SkeletonProps) => {
    const { className, borderRadius, height, width } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius,
    };

    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
        />
    );
});
