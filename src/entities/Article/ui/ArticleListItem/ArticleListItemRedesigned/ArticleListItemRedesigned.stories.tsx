import type { Meta, StoryObj } from '@storybook/react';

import { ArticleListItemRedesigned } from './ArticleListItemRedesigned';

// TODO - write stories

const meta: Meta<typeof ArticleListItemRedesigned> = {
    title: 'entities/Article/ArticleListItem/ArticleListItemRedesigned',
    component: ArticleListItemRedesigned,
    args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
