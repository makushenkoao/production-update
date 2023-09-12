import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '../../redesigned/AppImage';
import { Skeleton } from '../Skeleton';
import UserIcon from '../../../assets/icons/user.svg';
import cls from './Avatar.module.scss';
import { Icon } from '../Icon';

interface AvatarProps {
    className?: string;
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    rounded?: boolean;
    fallbackInverted?: boolean;
}

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const {
        src,
        alt,
        className,
        height = 100,
        width = 100,
        rounded,
        fallbackInverted,
    } = props;

    const fallback = (
        <Skeleton
            width={width}
            height={height}
            borderRadius={rounded ? '50%' : undefined}
        />
    );

    const errorFallback = (
        <Icon
            svg={UserIcon}
            width={width}
            height={height}
            inverted={fallbackInverted}
        />
    );

    return (
        <AppImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={classNames(
                cls.Avatar,
                {
                    [cls.rounded]: rounded,
                },
                [className],
            )}
            fallback={fallback}
            errorFallback={errorFallback}
        />
    );
};
