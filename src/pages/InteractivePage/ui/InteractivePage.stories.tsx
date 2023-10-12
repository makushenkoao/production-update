import type { Meta, StoryObj } from '@storybook/react';

import InteractivePage from './InteractivePage';

import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof InteractivePage> = {
    title: 'pages/InteractivePage',
    component: InteractivePage,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightInteractivePage: Story = {
    args: {},
};

export const DarkInteractivePage: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
