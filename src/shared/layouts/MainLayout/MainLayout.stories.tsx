import type { Meta, StoryObj } from '@storybook/react';
import { MainLayout } from './MainLayout';

// TODO - Write stories

const meta: Meta<typeof MainLayout> = {
    title: 'shared/layouts/MainLayout',
    component: MainLayout,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
