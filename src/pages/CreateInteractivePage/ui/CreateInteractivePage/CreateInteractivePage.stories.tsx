import type { Meta, StoryObj } from '@storybook/react';
import CreateInteractivePage from './CreateInteractivePage';

// TODO - write stories

const meta: Meta<typeof CreateInteractivePage> = {
    title: 'pages/CreateInteractivePage',
    component: CreateInteractivePage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const primary: Story = {
    args: {},
};
