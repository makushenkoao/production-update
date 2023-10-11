import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { getUserAuthData } from '@/entities/User';
import { useGetProfileDataQuery } from '@/entities/Profile';
import { FollowingArticleList } from '@/features/FollowingArticleList';
import { RecentArticlesList } from '@/features/RecentArticlesList';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

const MainPage = () => {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const { data: profile, isLoading: profileLoading } = useGetProfileDataQuery(
        authData?.id,
    );

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
        <Page data-testid="MainPage">
            <VStack
                max
                gap="32"
            >
                <FollowingArticleList />
                <RecentArticlesList />
            </VStack>
        </Page>
    );
};

export default MainPage;
