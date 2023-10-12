import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonSize, ButtonTheme } from './Button';

const meta: Meta<typeof Button> = {
    title: 'shared/ui/deprecated/Button',
    component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ClearTheme: Story = {
    args: {
        children: 'Clear',
        theme: ButtonTheme.CLEAR,
    },
};

export const ClearInvertedTheme: Story = {
    args: {
        children: 'Clear Inverted',
        theme: ButtonTheme.CLEAR_INVERTED,
    },
};

export const OutlinedTheme: Story = {
    args: {
        children: 'Outline',
        theme: ButtonTheme.OUTLINE,
    },
};

export const BackgroundTheme: Story = {
    args: {
        children: 'Background',
        theme: ButtonTheme.BACKGROUND,
    },
};

export const BackgroundInvertedTheme: Story = {
    args: {
        children: 'Background Inverted',
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};

export const BackgroundOutlineRedTheme: Story = {
    args: {
        children: 'Background Inverted',
        theme: ButtonTheme.OUTLINE_RED,
    },
};

export const SizeM: Story = {
    args: {
        children: 'M',
        size: ButtonSize.M,
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};

export const SizeL: Story = {
    args: {
        children: 'L',
        size: ButtonSize.L,
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};

export const SizeXL: Story = {
    args: {
        children: 'XL',
        size: ButtonSize.XL,
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};

export const SquareSizeM: Story = {
    args: {
        children: '>',
        square: true,
        size: ButtonSize.M,
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};

export const SquareSizeL: Story = {
    args: {
        children: '>',
        square: true,
        size: ButtonSize.L,
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};

export const SquareSizeXL: Story = {
    args: {
        children: '>',
        square: true,
        size: ButtonSize.XL,
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};

export const DisabledButton: Story = {
    args: {
        children: 'Button',
        disabled: true,
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};
