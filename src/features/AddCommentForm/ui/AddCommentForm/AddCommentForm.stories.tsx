import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AddCommentForm from './AddCommentForm';

import { ThemeDecorator } from '@/shared/config/storybook';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof AddCommentForm> = {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    args: {
        onSendComment: action('onSendComment'),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightAddCommentForm: Story = {
    args: {},
    decorators: [StoreDecorator({})],
};

export const DarkAddCommentForm: Story = {
    args: {},
    decorators: [StoreDecorator({}), ThemeDecorator(Theme.DARK)],
};
