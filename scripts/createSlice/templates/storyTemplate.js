module.exports = (layer, componentName) => `import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook';
import { Theme } from 'app/providers/ThemeProvider';
import { ${componentName} } from './${componentName}';

// TODO - write stories

const meta: Meta<typeof ${componentName}> = {
    title: 'pages/${componentName}',
    component: ${componentName},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Light${componentName}: Story = {
    args: {},
};

export const Dark${componentName}: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Orange${componentName}: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.ORANGE)],
};
`;
