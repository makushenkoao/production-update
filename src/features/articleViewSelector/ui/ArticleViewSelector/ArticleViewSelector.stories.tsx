import type { Meta, StoryObj } from '@storybook/react';

import { ArticleViewSelector } from './ArticleViewSelector';

import { ThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleViewSelector> = {
    title: 'features/Article/ArticleViewSelector',
    component: ArticleViewSelector,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticleViewSelector: Story = {
    args: {},
};

export const DarkArticleViewSelector: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
