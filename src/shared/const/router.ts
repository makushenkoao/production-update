export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN = 'admin',
    FORBIDDEN = 'forbidden',
    SETTINGS = 'settings',
    SEARCH = 'search',
    CHATS = 'chats',
    CHAT = 'chat',
    SAVED_ARTICLES = 'saved_articles',
    INTERACTIVE = 'interactive',
    INTERACTIVE_TASK = 'interactive_task',
    INTERACTIVE_CREATE = 'interactive_create',
    ARCHIVE_ARTICLES = 'archive_articles',
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/article/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteChats = () => '/chats';
export const getRouteChat = (id: string) => `/chats/${id}`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteSearch = () => '/search';
export const getRouteSavedArticles = (id: string) => `/profile/${id}/saved`;
export const getRouteInteractive = () => `/interactive`;
export const getRouteInteractiveTask = (task: string) => `/interactive/${task}`;
export const getRouteInteractiveCreate = () => `/admin/interactive_create`;
export const getRouteArchiveArticles = (id: string) => `/profile/${id}/archive`;

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteSettings()]: AppRoutes.SETTINGS,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteArticles()]: AppRoutes.ARTICLES,
    [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
    [getRouteChats()]: AppRoutes.CHATS,
    [getRouteChat(':id')]: AppRoutes.CHAT,
    [getRouteAdmin()]: AppRoutes.ADMIN,
    [getRouteSearch()]: AppRoutes.SEARCH,
    [getRouteInteractiveCreate()]: AppRoutes.INTERACTIVE_CREATE,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
    [getRouteSavedArticles(':id')]: AppRoutes.SAVED_ARTICLES,
    [getRouteInteractive()]: AppRoutes.INTERACTIVE,
    [getRouteInteractiveTask(':task')]: AppRoutes.INTERACTIVE_TASK,
    [getRouteArchiveArticles(':id')]: AppRoutes.ARCHIVE_ARTICLES,
};
