module.exports = (
    layer,
    componentName,
) => `import type { Meta, StoryObj } from '@storybook/react';

import { ${componentName} } from './${componentName}';

// TODO - write stories

const meta: Meta<typeof ${componentName}> = {
    title: '${layer}/${componentName}',
    component: ${componentName},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary${componentName}: Story = {
    args: {},
};
`;
