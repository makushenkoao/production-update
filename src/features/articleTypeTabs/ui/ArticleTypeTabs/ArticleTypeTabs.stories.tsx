import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { ArticleTypeTabs } from './ArticleTypeTabs';
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
