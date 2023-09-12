import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

// TODO - write stories

const meta: Meta<typeof Dropdown> = {
    title: 'shared/ui/redesigned/Dropdown',
    component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
