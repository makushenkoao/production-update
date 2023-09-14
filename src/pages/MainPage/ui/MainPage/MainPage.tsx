import { useSelector } from 'react-redux';
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

const MainPage = () => {
    const authData = useSelector(getUserAuthData);
    const { data: profile, isLoading } = useGetProfileDataQuery(authData?.id);
    const {
        data: articles,
        isLoading: articlesIsLoading,
        error,
    } = useGetArticlesQuery();

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
