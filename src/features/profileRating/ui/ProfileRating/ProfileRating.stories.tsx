import type { Meta, StoryObj } from '@storybook/react';

import ProfileRating from '../../ui/ProfileRating/ProfileRating';

// TODO - write stories

const meta: Meta<typeof ProfileRating> = {
    title: 'features/ProfileRating',
    component: ProfileRating,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
