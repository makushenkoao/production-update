import cls from './PageLoader.module.scss';

import { Loader } from '@/shared/ui/deprecated/Loader';
import { classNames } from '@/shared/lib/classNames/classNames';

export const PageLoader = ({ className }: { className?: string }) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <Loader />
    </div>
);
