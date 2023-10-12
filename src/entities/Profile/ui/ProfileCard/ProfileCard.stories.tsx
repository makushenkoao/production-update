import type { Meta, StoryObj } from '@storybook/react';

import { ProfileCard } from './ProfileCard';

import { ThemeDecorator } from '@/shared/config/storybook';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarPng from '@/shared/assets/tests/storybook.png';
import { Theme } from '@/shared/const/theme';

const data = {
    firstname: 'Anton',
    lastname: 'Makushenko',
    age: 17,
    currency: Currency.UAH,
    country: Country.Ukraine,
    city: 'Cherkasy',
    username: 'admin',
    avatar: AvatarPng,
};

const meta: Meta<typeof ProfileCard> = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightProfileCard: Story = {
    args: {
        data,
    },
};

export const DarkProfileCard: Story = {
    args: {
        data,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const LightProfileCardIsLoading: Story = {
    args: {
        isLoading: true,
    },
};

export const DarkProfileCardIsLoading: Story = {
    args: {
        isLoading: true,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const LightProfileCardError: Story = {
    args: {
        error: 'error',
    },
};

export const DarkProfileCardError: Story = {
    args: {
        error: 'error',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
