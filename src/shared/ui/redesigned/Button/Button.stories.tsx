import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

// TODO - write stories

const meta: Meta<typeof Button> = {
    title: 'shared/ui/redesigned/Button',
    component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
