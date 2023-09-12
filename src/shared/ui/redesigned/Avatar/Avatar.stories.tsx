import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

// TODO - write stories

const meta: Meta<typeof Avatar> = {
    title: 'shared/ui/redesigned/Avatar',
    component: Avatar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
