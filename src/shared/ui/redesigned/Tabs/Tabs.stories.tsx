import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './Tabs';

// TODO - write stories

const meta: Meta<typeof Tabs> = {
    title: 'shared/ui/redesigned/Tabs',
    component: Tabs,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
