import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../redesigned/AppImage';
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
    className?: string;
    src?: string;
    width?: number | string;
    height?: number | string;
    alt?: string;
}

export const Avatar = ({
    className,
    src,
    height = 100,
    width = 100,
    alt,
}: AvatarProps) => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(
        () => ({
            width,
            height,
        }),
        [height, width],
    );

    const fallback = (
        <Skeleton
            width={width}
            height={height}
            borderRadius="50%"
        />
    );
    const errorFallback = (
        <Icon
            width={width}
            height={height}
            svg={UserIcon}
        />
    );

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
};
