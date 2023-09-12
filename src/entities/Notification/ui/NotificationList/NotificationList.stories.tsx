import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { NotificationList } from './NotificationList';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const meta: Meta<typeof NotificationList> = {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    decorators: [StoreDecorator({})],
    parameters: {
        mockData: [
            {
                url: `${__API__}/notifications`,
                method: 'GET',
                status: 200,
                response: [
                    {
                        id: '1',
                        title: 'Повідомення',
                        description: 'Бла бла бла...',
                    },
                    {
                        id: '2',
                        title: 'Повідомення 2',
                        description: 'Бла бла бла...',
                    },
                    {
                        id: '3',
                        title: 'Повідомення 3',
                        description: 'Бла бла бла...',
                    },
                ],
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightNotificationList: Story = {
    args: {},
};

export const DarkNotificationList: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
