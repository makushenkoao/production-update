import type { Meta, StoryObj } from '@storybook/react';
import { ArticlePageGreeting } from './ArticlePageGreeting';

// TODO - write stories

const meta: Meta<typeof ArticlePageGreeting> = {
    title: 'pages/ArticlePageGreeting',
    component: ArticlePageGreeting,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
