import type { Meta, StoryObj } from '@storybook/react';

import { CurrencySelect } from './CurrencySelect';

import { ThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof CurrencySelect> = {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightCurrencySelect: Story = {
    args: {},
};

export const DarkCurrencySelect: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
