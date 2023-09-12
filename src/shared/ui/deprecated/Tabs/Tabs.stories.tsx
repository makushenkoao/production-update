import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeDecorator } from '@/shared/config/storybook';
import { Tabs } from './Tabs';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof Tabs> = {
    title: 'shared/ui/deprecated/Tabs',
    component: Tabs,
    args: {
        tabs: [
            {
                value: 'tab 1',
                content: 'tab 1',
            },
            {
                value: 'tab 2',
                content: 'tab 2',
            },
            {
                value: 'tab 3',
                content: 'tab 3',
            },
        ],
        value: 'tab 2',
        onTabClick: action('onTabClick'),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightTabs: Story = {
    args: {},
};

export const DarkTabs: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OrangeTabs: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
