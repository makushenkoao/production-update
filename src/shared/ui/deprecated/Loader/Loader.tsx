import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
    className?: string;
    width?: number;
    height?: number;
}

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const Loader = (props: LoaderProps) => {
    const { className, width = 80, height = 80 } = props;
    return (
        <div
            className={classNames('lds-default', {}, [className])}
            style={{ width, height }}
        >
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};
