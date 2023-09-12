import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const Loader = ({ className }: { className?: string }) => (
    <div className={classNames('lds-default', {}, [className])}>
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
