import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

import { ThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof Select> = {
    title: 'shared/ui/deprecated/Select',
    component: Select,
    args: {
        label: 'Select',
        options: [
            {
                content: 'One',
                value: '1',
            },
            {
                content: 'Two',
                value: '2',
            },
            {
                content: 'Three',
                value: '3',
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightSelect: Story = {
    args: {},
};

export const DarkSelect: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
