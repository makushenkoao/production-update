import { createSelector } from '@reduxjs/toolkit';

import { SidebarItemTypes } from '../types/sidebar';

import { getUserAuthData } from '@/entities/User';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteForum,
    getRouteInteractive,
    getRouteJobs,
    getRouteMain,
    getRouteSearch,
} from '@/shared/const/router';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/info.svg';
import ArticleIcon from '@/shared/assets/icons/article-re.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import InteractiveIcon from '@/shared/assets/icons/interactive.svg';
import JobIcon from '@/shared/assets/icons/job.svg';
import ForumIcon from '@/shared/assets/icons/forum.svg';

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
                path: getRouteJobs(),
                text: 'Робота',
                icon: JobIcon,
                authOnly: true,
            },
            {
                path: getRouteForum(),
                text: 'Форум',
                icon: ForumIcon,
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
