import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

// TODO - write stories

const meta: Meta<typeof Skeleton> = {
    title: 'shared/ui/redesigned/Skeleton',
    component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
