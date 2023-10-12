import React, { memo, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppRouter } from './providers/router';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { getUserMounted, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';

const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const mounted = useSelector(getUserMounted);
    const toolbar = useAppToolbar();

    useEffect(() => {
        if (!mounted) {
            dispatch(initAuthData());
        }
    }, [dispatch, mounted]);

    if (!mounted) {
        return (
            <div
                id="app"
                className={classNames('app_redesigned', {}, [theme])}
            >
                <AppLoaderLayout />{' '}
            </div>
        );
    }

    return (
        <div
            id="app"
            className={classNames('app_redesigned', {}, [theme])}
        >
            <Suspense fallback="">
                <MainLayout
                    header={<Navbar />}
                    sidebar={<Sidebar />}
                    content={<AppRouter />}
                    toolbar={toolbar}
                />
            </Suspense>
        </div>
    );
};

export default withTheme(memo(App));
