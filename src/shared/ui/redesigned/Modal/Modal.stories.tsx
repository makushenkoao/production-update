import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { Modal } from './Modal';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof Modal> = {
    title: 'shared/ui/deprecated/Modal',
    component: Modal,
    args: {
        children: 'Modal',
        isOpen: true,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightModal: Story = {
    args: {},
};

export const DarkModal: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
