import type { Meta, StoryObj } from '@storybook/react';
import { UiDesignSwitcher } from './UiDesignSwitcher';

// TODO - write stories

const meta: Meta<typeof UiDesignSwitcher> = {
    title: 'features/UiDesignSwitcher',
    component: UiDesignSwitcher,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
