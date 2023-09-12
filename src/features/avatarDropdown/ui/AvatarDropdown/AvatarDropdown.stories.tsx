import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { AvatarDropdown } from './AvatarDropdown';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const meta: Meta<typeof AvatarDropdown> = {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    decorators: [StoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightAvatarDropdown: Story = {
    args: {},
};

export const DarkAvatarDropdown: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
