import type { Meta, StoryObj } from '@storybook/react';

import AdminPanelPage from './AdminPanelPage';

import { ThemeDecorator } from '@/shared/config/storybook';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof AdminPanelPage> = {
    title: 'pages/AdminPanelPage',
    component: AdminPanelPage,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightAdminPanelPage: Story = {
    args: {},
};

export const DarkAdminPanelPage: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
