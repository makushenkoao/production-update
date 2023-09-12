import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { ForbiddenPage } from './ForbiddenPage';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ForbiddenPage> = {
    title: 'pages/ForbiddenPage',
    component: ForbiddenPage,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightForbiddenPage: Story = {
    args: {},
};

export const DarkForbiddenPage: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
