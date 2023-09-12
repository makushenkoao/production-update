import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { NotificationItem } from './NotificationItem';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof NotificationItem> = {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    args: {
        item: {
            id: '1',
            title: 'Повідомення',
            description: 'Бла бла бла...',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightNotificationItem: Story = {
    args: {},
};

export const DarkNotificationItem: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
