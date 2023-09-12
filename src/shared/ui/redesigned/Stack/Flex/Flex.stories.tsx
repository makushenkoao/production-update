import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

// TODO - write stories

const meta: Meta<typeof Flex> = {
    title: 'shared/ui/redesigned/Flex',
    component: Flex,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
