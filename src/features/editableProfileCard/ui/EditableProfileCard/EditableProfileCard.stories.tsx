import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Profile } from '@/entities/Profile';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { EditableProfileCard } from './EditableProfileCard';
import { Theme } from '@/shared/const/theme';

const form: Profile = {
    id: '1',
    firstname: 'Anton',
    lastname: 'Makushenko',
    age: 20,
    username: 'admin',
    avatar: '',
    country: Country.Ukraine,
    currency: Currency.USD,
    city: 'Che',
};

const meta: Meta<typeof EditableProfileCard> = {
    title: 'features/EditableProfileCard',
    component: EditableProfileCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightEditableProfileCard: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile: {
                form,
            },
        }),
    ],
};

export const DarkEditableProfileCard: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.DARK),
        StoreDecorator({
            profile: {
                form,
            },
        }),
    ],
};

export const LightEditableProfileCardLoading: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile: {
                isLoading: true,
            },
        }),
    ],
};

export const DarkEditableProfileCardLoading: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.DARK),
        StoreDecorator({
            profile: {
                isLoading: true,
            },
        }),
    ],
};

export const LightEditableProfileCardError: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            profile: {
                error: 'error',
            },
        }),
    ],
};

export const DarkEditableProfileCardError: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.DARK),
        StoreDecorator({
            profile: {
                error: 'error',
            },
        }),
    ],
};
