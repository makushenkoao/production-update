import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Navbar } from './Navbar';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof Navbar> = {
    title: 'widgets/Navbar',
    component: Navbar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightNavbarNoAuth: Story = {
    args: {},
    decorators: [StoreDecorator({})],
};

export const DarkNavbarNoAuth: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};

export const LightNavbarAuth: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    username: '123',
                    id: '1',
                },
            },
        }),
    ],
};

export const DarkNavbarAuth: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.DARK),
        StoreDecorator({
            user: {
                authData: {
                    username: '123',
                    id: '1',
                },
            },
        }),
    ],
};
