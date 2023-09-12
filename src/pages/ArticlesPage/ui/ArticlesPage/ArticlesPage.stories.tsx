import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import ArticlesPage from './ArticlesPage';
import { ARTICLE_MOCK } from '@/entities/Article';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticlesPage> = {
    title: 'pages/Article/ArticlesPage',
    component: ArticlesPage,
    decorators: [StoreDecorator({})],
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles?_expand=user&_limit=9&_page=2&_order=asc&_sort=created&q=`,
                method: 'GET',
                status: 200,
                response: [
                    { ...ARTICLE_MOCK, id: '1' },
                    { ...ARTICLE_MOCK, id: '2' },
                    { ...ARTICLE_MOCK, id: '3' },
                    { ...ARTICLE_MOCK, id: '4' },
                    { ...ARTICLE_MOCK, id: '5' },
                    { ...ARTICLE_MOCK, id: '6' },
                    { ...ARTICLE_MOCK, id: '7' },
                    { ...ARTICLE_MOCK, id: '8' },
                    { ...ARTICLE_MOCK, id: '9' },
                ],
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticlesPage: Story = {
    args: {},
};

export const DarkArticlesPage: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
