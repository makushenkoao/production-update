import type { Meta, StoryObj } from '@storybook/react';

import JobsPage from './JobDetailsPage';

import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const meta: Meta<typeof JobsPage> = {
    title: 'pages/JobsPage',
    component: JobsPage,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const primary: Story = {
    args: {},
};
