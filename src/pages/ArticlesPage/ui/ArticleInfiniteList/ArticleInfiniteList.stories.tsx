import type { Meta, StoryObj } from '@storybook/react';

import { ArticleInfiniteList } from './ArticleInfiniteList';

import { ThemeDecorator } from '@/shared/config/storybook';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleInfiniteList> = {
    title: 'pages/Article/ArticleInfiniteList',
    component: ArticleInfiniteList,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticleInfiniteList: Story = {
    args: {},
};

export const DarkArticleInfiniteList: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
