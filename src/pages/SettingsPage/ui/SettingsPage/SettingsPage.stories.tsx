import type { Meta, StoryObj } from '@storybook/react';
import SettingsPage from './SettingsPage';

// TODO - write stories

const meta: Meta<typeof SettingsPage> = {
    title: 'pages/SettingsPage',
    component: SettingsPage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
