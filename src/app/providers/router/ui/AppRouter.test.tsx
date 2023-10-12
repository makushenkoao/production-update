import { screen } from '@testing-library/react';

import AppRouter from './AppRouter';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { getRouteAbout, getRouteAdmin } from '@/shared/const/router';
import { UserRole } from '@/entities/User';

describe('app/router/AppRouter', () => {
    test('The page should render', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout(),
        });

        const page = await screen.findByTestId('AboutPage');
        expect(page).toBeInTheDocument();
    });

    test('Page not found', async () => {
        componentRender(<AppRouter />, {
            route: '/random-path',
        });

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });

    // TODO - Test fails
    // test('Redirect an unauthorized user to the main page', async () => {
    //     componentRender(<AppRouter />, {
    //         route: getRouteProfile('1'),
    //     });
    //
    //     const page = await screen.findByTestId('MainPage');
    //     expect(page).toBeInTheDocument();
    // });

    // TODO - Test fails
    // test('Access to a closed page for an authorized user', async () => {
    //     componentRender(<AppRouter />, {
    //         route: getRouteProfile('1'),
    //         initialState: {
    //             user: { _mounted: true, authData: {} },
    //         },
    //     });
    //
    //     const page = await screen.findByTestId('ArchiveArticlesPage');
    //     screen.debug();
    //     expect(page).toBeInTheDocument();
    // });

    test('Access denied (role missing)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: { _mounted: true, authData: {} },
            },
        });

        const page = await screen.findByTestId('ForbiddenPage');
        expect(page).toBeInTheDocument();
    });

    test('Access granted (role present)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: { _mounted: true, authData: { roles: [UserRole.ADMIN] } },
            },
        });

        const page = await screen.findByTestId('AdminPanelPage');
        expect(page).toBeInTheDocument();
    });
});
