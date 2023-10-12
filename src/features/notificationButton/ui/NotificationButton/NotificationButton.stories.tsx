import type { Meta, StoryObj } from '@storybook/react';

import { NotificationButton } from './NotificationButton';

import { ThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/const/theme';

// TODO - write stories

const meta: Meta<typeof NotificationButton> = {
    title: 'pages/NotificationButton',
    component: NotificationButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightNotificationButton: Story = {
    args: {},
};

export const DarkNotificationButton: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
