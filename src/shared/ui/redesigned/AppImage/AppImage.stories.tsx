import type { Meta, StoryObj } from '@storybook/react';
import { AppImage } from './AppImage';

// TODO - write stories

const meta: Meta<typeof AppImage> = {
    title: 'shared/ui/redesigned/AppImage',
    component: AppImage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
