import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof Loader> = {
    title: 'shared/ui/deprecated/Loader',
    component: Loader,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightLoader: Story = {
    args: {},
};

export const DarkLoader: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
