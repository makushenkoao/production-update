import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';
import { getUserAuthData } from '@/entities/User';
import { FollowingArticleList } from '@/features/FollowingArticleList';
import { RecentArticlesList } from '@/features/RecentArticlesList';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { PopularArticlesList } from '@/features/PopularArticlesList';

const MainPage = () => {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);

    if (!authData) {
        return (
            <Page data-testid="MainPage">
                <Text
                    align="center"
                    title={t('Зачекайте')}
                    text={t(
                        'Увійдіть до облікового запису щоб мати весь функціонал нашого сайту.',
                    )}
                />
            </Page>
        );
    }

    return (
        <StickyContentLayout
            content={
                <Page data-testid="MainPage">
                    <VStack
                        max
                        gap="32"
                    >
                        <FollowingArticleList />
                        <RecentArticlesList />
                    </VStack>
                </Page>
            }
            right={<PopularArticlesList />}
        />
    );
};

export default MainPage;
