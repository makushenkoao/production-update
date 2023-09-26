import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemTypes } from '../types/sidebar';
import {
    getRouteAbout,
    getRouteArticleCreate,
    getRouteArticles,
    getRouteChats,
    getRouteInteractive,
    getRouteMain,
    getRouteSearch,
} from '@/shared/const/router';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/info.svg';
import ArticleIcon from '@/shared/assets/icons/article-re.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import CreateIcon from '@/shared/assets/icons/create.svg';
import ChatIcon from '@/shared/assets/icons/chat.svg';
import InteractiveIcon from '@/shared/assets/icons/interactive.svg';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SidebarItemTypes[] = [
        {
            path: getRouteMain(),
            text: 'Головна',
            icon: MainIcon,
        },
        {
            path: getRouteAbout(),
            text: 'Про сайт',
            icon: AboutIcon,
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteArticles(),
                text: 'Статті',
                icon: ArticleIcon,
                authOnly: true,
            },
            {
                path: getRouteChats(),
                text: 'Чати',
                icon: ChatIcon,
            },
            {
                path: getRouteArticleCreate(),
                text: 'Створити статтю',
                icon: CreateIcon,
            },
            {
                path: getRouteSearch(),
                text: 'Пошук користувача',
                icon: SearchIcon,
            },
            {
                path: getRouteInteractive(),
                text: 'Інтерактив',
                icon: InteractiveIcon,
            },
        );
    }

    return sidebarItemsList;
});
