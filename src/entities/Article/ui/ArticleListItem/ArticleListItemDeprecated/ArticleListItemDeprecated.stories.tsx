import type { Meta, StoryObj } from '@storybook/react';

import { ArticleListItemDeprecated } from './ArticleListItemDeprecated';

// TODO - write stories

const meta: Meta<typeof ArticleListItemDeprecated> = {
    title: 'entities/Article/ArticleListItem/ArticleListItemDeprecated',
    component: ArticleListItemDeprecated,
    args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
