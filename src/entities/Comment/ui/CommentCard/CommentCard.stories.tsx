import type { Meta, StoryObj } from '@storybook/react';

import { CommentCard } from './CommentCard';

import { ThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/const/theme';

const comment = {
    id: '1',
    text: 'hello',
    user: {
        id: '1',
        username: 'Username1',
    },
    likes: ['1', '2', '3'],
};

const meta: Meta<typeof CommentCard> = {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightCommentCard: Story = {
    args: {
        comment,
    },
};

export const DarkCommentCard: Story = {
    args: {
        comment,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const LightCommentCardLoading: Story = {
    args: {
        isLoading: true,
    },
};

export const DarkCommentCardLoading: Story = {
    args: {
        isLoading: true,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
