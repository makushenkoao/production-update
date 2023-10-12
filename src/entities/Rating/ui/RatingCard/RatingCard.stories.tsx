import type { Meta, StoryObj } from '@storybook/react';

import { RatingCard } from './RatingCard';

import { ThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof RatingCard> = {
    title: 'entities/RatingCard',
    component: RatingCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightRatingCard: Story = {
    args: {},
};

export const DarkRatingCard: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
