import type { Meta, StoryObj } from '@storybook/react';

import SavedArticlesPage from './SavedArticlesPage';

import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof SavedArticlesPage> = {
    title: 'pages/SavedArticlesPage',
    component: SavedArticlesPage,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightSavedArticles: Story = {
    args: {},
};

export const DarkSavedArticles: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
