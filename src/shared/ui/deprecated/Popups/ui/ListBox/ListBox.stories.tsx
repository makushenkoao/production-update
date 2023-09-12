import type { Meta, StoryObj } from '@storybook/react';
import { ListBox } from './ListBox';

const meta: Meta<typeof ListBox> = {
    title: 'shared/ui/deprecated/Popups/ListBox',
    component: ListBox,
    args: {
        value: '123',
        items: [
            { content: '1asfasfasf23', value: '123' },
            { content: '1asfasfasf21233', value: '1232' },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ListBoxTopRight: Story = {
    args: {
        direction: 'top right',
    },
};

export const ListBoxTopLeft: Story = {
    args: {
        direction: 'top left',
    },
};

export const ListBoxBottomRight: Story = {
    args: {
        direction: 'bottom right',
    },
};

export const ListBoxBottomLeft: Story = {
    args: {
        direction: 'bottom left',
    },
};
