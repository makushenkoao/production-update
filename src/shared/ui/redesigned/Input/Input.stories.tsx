import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

// TODO - write stories

const meta: Meta<typeof Input> = {
    title: 'shared/ui/redesigned/Input',
    component: Input,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
