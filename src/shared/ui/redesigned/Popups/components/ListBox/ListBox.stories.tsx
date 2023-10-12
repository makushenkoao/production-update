import type { Meta, StoryObj } from '@storybook/react';

import { ListBox } from './ListBox';

// TODO - write stories

const meta: Meta<typeof ListBox> = {
    title: 'shared/ui/redesigned/ListBox',
    component: ListBox,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
