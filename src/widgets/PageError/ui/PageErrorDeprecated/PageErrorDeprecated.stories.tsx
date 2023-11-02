import type { Meta, StoryObj } from '@storybook/react';

import { PageErrorDeprecated } from './PageErrorDeprecated';

import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof PageErrorDeprecated> = {
    title: 'widgets/PageErrorDeprecated',
    component: PageErrorDeprecated,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightPageError: Story = {
    args: {},
};

export const DarkPageError: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
