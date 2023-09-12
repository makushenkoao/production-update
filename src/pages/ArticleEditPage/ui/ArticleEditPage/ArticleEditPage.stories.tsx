import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import ArticleEditPage from './ArticleEditPage';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleEditPage> = {
    title: 'pages/Article/ArticleEditPage',
    component: ArticleEditPage,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticleEditPage: Story = {
    args: {},
};

export const DarkArticleEditPage: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
