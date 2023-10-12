import type { Meta, StoryObj } from '@storybook/react';

import { Popover } from './Popover';

// TODO - write stories

const meta: Meta<typeof Popover> = {
    title: 'shared/ui/redesigned/Popover',
    component: Popover,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
