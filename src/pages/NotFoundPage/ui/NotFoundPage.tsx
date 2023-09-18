import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <Page
            data-testid="NotFoundPage"
            className={cls.NotFoundPage}
        >
            {t('Сторінка не знайдена')}
        </Page>
    );
};
