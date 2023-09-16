import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { getUserAuthData } from '@/entities/User';
import { useGetProfileDataQuery } from '../../api/getProfileDataApi/getProfileDataApi';
import { FollowingArticleList } from '../FollowingArticleList/FollowingArticleList';
import { RecentArticlesList } from '../RecentArticlesList/RecentArticlesList';
import {
    ArticleList,
    ArticleView,
    useGetArticlesQuery,
} from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

const MainPage = () => {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const { data: profile, isLoading } = useGetProfileDataQuery(authData?.id);
    const {
        data: articles,
        isLoading: articlesIsLoading,
        error,
    } = useGetArticlesQuery();

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

    if (isLoading) {
        return (
            <ArticleList
                articles={[]}
                isLoading
                view={ArticleView.BIG}
            />
        );
    }

    return (
        <Page data-testid="MainPage">
            {profile?.following?.length ? (
                <VStack
                    max
                    gap="32"
                >
                    <FollowingArticleList
                        articles={articles}
                        isLoading={articlesIsLoading}
                        followingIds={profile.following}
                    />
                    <RecentArticlesList
                        articles={articles}
                        isLoading={articlesIsLoading}
                    />
                </VStack>
            ) : (
                <RecentArticlesList
                    articles={articles}
                    isLoading={articlesIsLoading}
                />
            )}
        </Page>
    );
};

export default MainPage;
