import type { Meta, StoryObj } from '@storybook/react';

import { ArticleSortSelector } from './ArticleSortSelector';

import { ThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleSortSelector> = {
    title: 'features/Article/ArticleSortSelector',
    component: ArticleSortSelector,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticleSortSelector: Story = {
    args: {},
};

export const DarkArticleSortSelector: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
