import type { Meta, StoryObj } from '@storybook/react';

import { ArticlesPageFilters } from './ArticlesPageFilters';

import { ThemeDecorator } from '@/shared/config/storybook';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticlesPageFilters> = {
    title: 'pages/Article/ArticlesPageFilters',
    component: ArticlesPageFilters,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticlesPageFilters: Story = {
    args: {},
};

export const DarkArticlesPageFilters: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
