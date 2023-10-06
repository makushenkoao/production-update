import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import JobEditPage from './JobEditPage';

const meta: Meta<typeof JobEditPage> = {
    title: 'pages/JobEditPage',
    component: JobEditPage,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const primary: Story = {
    args: {},
};
