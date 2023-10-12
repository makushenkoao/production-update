import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar } from './Sidebar';

import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof Sidebar> = {
    title: 'widgets/Sidebar',
    component: Sidebar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightSidebarAuth: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            user: {
                authData: {},
            },
        }),
    ],
};

export const LightSidebarNoAuth: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            user: {},
        }),
    ],
};

export const DarkSidebarAuth: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            user: {
                authData: {},
            },
        }),
        ThemeDecorator(Theme.DARK),
    ],
};

export const DarkSidebarNoAuth: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            user: {},
        }),
        ThemeDecorator(Theme.DARK),
    ],
};
