import { Loader } from '@/shared/ui/deprecated/Loader';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageLoader.module.scss';

export const PageLoader = ({ className }: { className?: string }) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <Loader />
    </div>
);
