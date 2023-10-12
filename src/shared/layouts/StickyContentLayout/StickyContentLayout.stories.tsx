import type { Meta, StoryObj } from '@storybook/react';

import { StickyContentLayout } from './StickyContentLayout';

// TODO - write stories

const meta: Meta<typeof StickyContentLayout> = {
    title: 'shared/layouts/StickyContentLayout',
    component: StickyContentLayout,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
