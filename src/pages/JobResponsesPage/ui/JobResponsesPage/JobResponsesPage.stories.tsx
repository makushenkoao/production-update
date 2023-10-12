import type { Meta, StoryObj } from '@storybook/react';

import { JobResponsesPage } from './JobResponsesPage';

// TODO - write stories

const meta: Meta<typeof JobResponsesPage> = {
    title: 'pages/JobResponsesPage',
    component: JobResponsesPage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const primary: Story = {
    args: {},
};
