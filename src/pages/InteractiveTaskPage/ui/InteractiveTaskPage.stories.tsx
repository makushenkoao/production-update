import type { Meta, StoryObj } from '@storybook/react';

import InteractiveTaskPage from './InteractiveTaskPage';

import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof InteractiveTaskPage> = {
    title: 'pages/InteractiveTaskPage',
    component: InteractiveTaskPage,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightInteractiveTaskPage: Story = {
    args: {},
};

export const DarkInteractiveTaskPage: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
