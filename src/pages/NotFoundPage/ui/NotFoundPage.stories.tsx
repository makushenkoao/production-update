import type { Meta, StoryObj } from '@storybook/react';

import { NotFoundPage } from './NotFoundPage';

import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof NotFoundPage> = {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightNotFoundPage: Story = {
    args: {},
};

export const DarkNotFoundPage: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
