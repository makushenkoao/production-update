import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import ProfilePage from './ProfilePage';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ProfilePage> = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
};

const profile = {
    form: {
        firstname: 'Anton',
        lastname: 'Makushenko',
        age: 17,
        currency: Currency.UAH,
        country: Country.Ukraine,
        city: 'Cherkasy',
        username: 'admin',
    },
    readonly: true,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightProfilePage: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile,
        }),
    ],
};

export const DarkProfilePage: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile,
        }),
        ThemeDecorator(Theme.DARK),
    ],
};

export const LightProfilePageLoading: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile: {
                isLoading: true,
            },
        }),
    ],
};

export const DarkProfilePageLoading: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile: {
                isLoading: true,
            },
        }),
        ThemeDecorator(Theme.DARK),
    ],
};

export const LightProfilePageError: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile: {
                error: 'error',
            },
        }),
    ],
};

export const DarkProfilePageError: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile: {
                error: 'error',
            },
        }),
        ThemeDecorator(Theme.DARK),
    ],
};
