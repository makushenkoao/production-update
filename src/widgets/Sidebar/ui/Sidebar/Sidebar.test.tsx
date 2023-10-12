import { fireEvent, screen } from '@testing-library/react';

import { Sidebar } from './Sidebar';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => {
    test('Sidebar has data id sidebar', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        screen.debug();
    });

    test('Sidebar toggle', () => {
        componentRender(<Sidebar />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(expect(screen.getByTestId('sidebar')).toBeInTheDocument());
        fireEvent.click(toggleBtn);
        expect(expect(screen.getByTestId('sidebar')).toHaveClass('collapsedRedesigned'));
    });
});
