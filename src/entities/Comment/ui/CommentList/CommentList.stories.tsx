import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { CommentList } from './CommentList';
import { Theme } from '@/shared/const/theme';

const comments = [
    {
        id: '1',
        text: 'hello',
        user: {
            id: '1',
            username: 'Username1',
        },
    },
    {
        id: '2',
        text: 'hello',
        user: {
            id: '2',
            username: 'Username2',
        },
    },
];

const meta: Meta<typeof CommentList> = {
    title: 'entities/Comment/CommentList',
    component: CommentList,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightCommentList: Story = {
    args: {
        comments,
    },
};

export const DarkCommentList: Story = {
    args: {
        comments,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const LightCommentListIsLoading: Story = {
    args: {
        isLoading: true,
    },
};

export const DarkCommentListIsLoading: Story = {
    args: {
        isLoading: true,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
