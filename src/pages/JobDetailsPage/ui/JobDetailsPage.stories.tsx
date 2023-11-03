import type { Meta, StoryObj } from '@storybook/react';

import JobDetailsPage from './JobDetailsPage';

import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const meta: Meta<typeof JobDetailsPage> = {
    title: 'pages/JobDetailsPage',
    component: JobDetailsPage,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const primary: Story = {
    args: {},
};
