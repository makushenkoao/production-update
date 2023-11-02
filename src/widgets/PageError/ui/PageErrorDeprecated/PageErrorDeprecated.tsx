import { useTranslation } from 'react-i18next';

import cls from './PageErrorDeprecated.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

interface PageErrorProps {
    className?: string;
}

/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const PageErrorDeprecated = ({ className }: PageErrorProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <p>{t('Сталася непередбачена помилка')}</p>
            <Button
                theme={ButtonTheme.CLEAR}
                onClick={reloadPage}
            >
                {t('Оновити сторіку')}
            </Button>
        </div>
    );
};
