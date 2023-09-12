import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import ArticleDetailsPage from './ArticleDetailsPage';
import { ARTICLE_MOCK } from '@/entities/Article';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleDetailsPage> = {
    title: 'pages/ArticleDetailsPage',
    component: ArticleDetailsPage,
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles?_limit=4`,
                method: 'GET',
                status: 200,
                response: [
                    { ...ARTICLE_MOCK, id: '1' },
                    { ...ARTICLE_MOCK, id: '2' },
                    { ...ARTICLE_MOCK, id: '3' },
                    { ...ARTICLE_MOCK, id: '4' },
                ],
            },
            {
                url: `${__API__}/article-ratings?&userId=1`,
                method: 'GET',
                status: 200,
                response: [
                    {
                        id: '1',
                        rate: 4,
                        feedback: 'Хорошая статья',
                        userId: '1',
                        articleId: '1',
                    },
                ],
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticleDetailsPage: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            articleDetails: {
                data: ARTICLE_MOCK,
            },
        }),
    ],
};

export const DarkArticleDetailsPage: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            articleDetails: {
                data: ARTICLE_MOCK,
            },
        }),
        ThemeDecorator(Theme.DARK),
    ],
};

export const LightArticleDetailsPageLoading: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            articleDetails: {
                isLoading: true,
            },
        }),
    ],
};

export const DarkArticleDetailsPageLoading: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            articleDetails: {
                isLoading: true,
            },
        }),
        ThemeDecorator(Theme.DARK),
    ],
};

export const LightArticleDetailsPageError: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            articleDetails: {
                error: 'error',
            },
        }),
    ],
};

export const DarkArticleDetailsPageError: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            articleDetails: {
                error: 'error',
            },
        }),
        ThemeDecorator(Theme.DARK),
    ],
};
