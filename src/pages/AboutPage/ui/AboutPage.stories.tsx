import type { Meta, StoryObj } from '@storybook/react';

import AboutPage from './AboutPage';

import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof AboutPage> = {
    title: 'pages/AboutPage',
    component: AboutPage,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightAboutPage: Story = {
    args: {},
};

export const DarkAboutPage: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
