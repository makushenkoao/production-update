import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { Drawer } from './Drawer';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof Drawer> = {
    title: 'shared/ui/deprecated/Drawer',
    component: Drawer,
    args: {
        isOpen: true,
        children: <h1>content</h1>,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightDrawer: Story = {
    args: {},
};

export const DarkDrawer: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
