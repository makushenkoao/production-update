import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppRoutes } from '@/shared/const/router';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';
import { getUserAuthData } from '@/entities/User';
import { PopularArticlesList } from '@/features/PopularArticlesList';
import { Text } from '@/shared/ui/redesigned/Text';

export function useAppToolbar() {
    const { t } = useTranslation();
    const appRoute = useRouteChange();
    const authData = useSelector(getUserAuthData);

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
        [AppRoutes.MAIN]: authData ? (
            <PopularArticlesList />
        ) : (
            <Text
                text={t(
                    'Увійдіть до облікового запису, щоб бачити популярні статті.',
                )}
            />
        ),
    };

    return toolbarByAppRoute[appRoute];
}
