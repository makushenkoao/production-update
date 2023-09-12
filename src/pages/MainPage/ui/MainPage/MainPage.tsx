import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { RecentArticlesList } from '../RecentArticlesList/RecentArticlesList';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page data-testid="MainPage">
            <RecentArticlesList />
        </Page>
    );
};

export default MainPage;
