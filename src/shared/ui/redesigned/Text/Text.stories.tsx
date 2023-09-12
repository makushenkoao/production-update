import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

// TODO - write stories

const meta: Meta<typeof Text> = {
    title: 'shared/ui/redesigned/Text',
    component: Text,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
