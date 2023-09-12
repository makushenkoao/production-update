import type { Meta, StoryObj } from '@storybook/react';
import SearchPage from './SearchPage';

// TODO - write stories

const meta: Meta<typeof SearchPage> = {
    title: 'pages/SearchPage',
    component: SearchPage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
