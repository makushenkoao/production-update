import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { Text } from '../Text/Text';
import { Card } from './Card';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof Card> = {
    title: 'shared/ui/deprecated/Card',
    component: Card,
    args: {
        children: (
            <Text
                title="Title"
                text="text text text"
            />
        ),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightCard: Story = {
    args: {},
};

export const DarkCard: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
