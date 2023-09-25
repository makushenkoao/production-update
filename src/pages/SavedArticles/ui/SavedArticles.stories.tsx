import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import SavedArticles from './SavedArticles';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof SavedArticles> = {
    title: 'pages/SavedArticles',
    component: SavedArticles,
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
