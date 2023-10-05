import type { Meta, StoryObj } from '@storybook/react';
import ArchiveArticlesPage from './ArchiveArticlesPage';

const meta: Meta<typeof ArchiveArticlesPage> = {
    title: 'pages/ArchiveArticlesPage',
    component: ArchiveArticlesPage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const primary: Story = {
    args: {},
};
