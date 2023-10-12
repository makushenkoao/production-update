import type { Meta, StoryObj } from '@storybook/react';

import { ArticleTypeTabs } from './ArticleTypeTabs';

import { ThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleTypeTabs> = {
    title: 'features/Article/ArticleTypeTabs',
    component: ArticleTypeTabs,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticleTypeTabs: Story = {
    args: {},
};

export const DarkArticleTypeTabs: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
