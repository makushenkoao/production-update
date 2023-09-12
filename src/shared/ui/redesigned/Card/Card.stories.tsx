import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

// TODO - write stories

const meta: Meta<typeof Card> = {
    title: 'shared/ui/redesigned/Card',
    component: Card,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
