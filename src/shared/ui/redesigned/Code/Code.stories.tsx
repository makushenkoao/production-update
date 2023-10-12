import type { Meta, StoryObj } from '@storybook/react';

import { Code } from './Code';

import { ThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof Code> = {
    title: 'shared/ui/deprecated/Code',
    component: Code,
    args: {
        text:
            "import type { Meta, StoryObj } from '@storybook/react';\n" +
            "import { ThemeDecorator } from 'shared/config/storybook';\n" +
            "import { Theme } from 'app/providers/ThemeProvider';\n" +
            "import { Code } from './Code';\n" +
            '\n' +
            'const meta: Meta<typeof Code> = {\n' +
            "    title: 'folder/Code',\n" +
            '    component: Code,\n' +
            '};\n' +
            '\n' +
            'export default meta;\n' +
            'type Story = StoryObj<typeof meta>;',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightCode: Story = {
    args: {},
};

export const DarkCode: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OrangeCode: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
