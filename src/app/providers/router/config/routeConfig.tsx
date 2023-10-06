import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { UserRole } from '@/entities/User';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdmin,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteForbidden,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
    getRouteSettings,
    getRouteSearch,
    getRouteChats,
    getRouteChat,
    getRouteSavedArticles,
    getRouteInteractive,
    getRouteInteractiveTask,
    getRouteInteractiveCreate,
    getRouteArchiveArticles,
    getRouteJobs,
    getRouteJobDetails,
    getRouteJobCreate,
    getRouteJobEdit,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { SettingsPage } from '@/pages/SettingsPage';
import { SearchPage } from '@/pages/SearchPage';
import { ChatsPage } from '@/pages/ChatsPage';
import { ChatPage } from '@/pages/ChatPage';
import { InteractivePage } from '@/pages/InteractivePage';
import { SavedArticlesPage } from '@/pages/SavedArticlesPage';
import { InteractiveTaskPage } from '@/pages/InteractiveTaskPage';
import { CreateInteractivePage } from '@/pages/CreateInteractivePage';
import { ArchiveArticlesPage } from '@/pages/ArchiveArticlesPage';
import { JobsPage } from '@/pages/JobsPage';
import { JobDetailsPage } from '@/pages/JobDetailsPage';
import { JobEditPage } from '@/pages/JobEditPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [AppRoutes.SEARCH]: {
        path: getRouteSearch(),
        element: <SearchPage />,
        authOnly: true,
    },
    [AppRoutes.CHATS]: {
        path: getRouteChats(),
        element: <ChatsPage />,
        authOnly: true,
    },
    [AppRoutes.CHAT]: {
        path: getRouteChat(':id'),
        element: <ChatPage />,
        authOnly: true,
    },
    [AppRoutes.SAVED_ARTICLES]: {
        path: getRouteSavedArticles(':id'),
        element: <SavedArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARCHIVE_ARTICLES]: {
        path: getRouteArchiveArticles(':id'),
        element: <ArchiveArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.INTERACTIVE]: {
        path: getRouteInteractive(),
        element: <InteractivePage />,
        authOnly: true,
    },
    [AppRoutes.INTERACTIVE_TASK]: {
        path: getRouteInteractiveTask(':task'),
        element: <InteractiveTaskPage />,
        authOnly: true,
    },
    [AppRoutes.INTERACTIVE_CREATE]: {
        path: getRouteInteractiveCreate(),
        element: <CreateInteractivePage />,
        authOnly: true,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.JOB]: {
        path: getRouteJobs(),
        element: <JobsPage />,
        authOnly: true,
    },
    [AppRoutes.JOB_DETAILS]: {
        path: getRouteJobDetails(':id'),
        element: <JobDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.JOB_CREATE]: {
        path: getRouteJobCreate(),
        element: <JobEditPage />,
        authOnly: true,
    },
    [AppRoutes.JOB_EDIT]: {
        path: getRouteJobEdit(':id'),
        element: <JobEditPage />,
        authOnly: true,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
