import type { Meta, StoryObj } from '@storybook/react';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

import { ThemeDecorator } from '@/shared/config/storybook';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { Theme } from '@/shared/const/theme';
import { ARTICLE_MOCK } from '@/entities/Article';

const meta: Meta<typeof ArticleRecommendationsList> = {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    decorators: [StoreDecorator({})],
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles?_limit=3`,
                method: 'GET',
                status: 200,
                response: [
                    { ...ARTICLE_MOCK, id: '1' },
                    { ...ARTICLE_MOCK, id: '2' },
                    { ...ARTICLE_MOCK, id: '3' },
                ],
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticleRecommendationsList: Story = {
    args: {},
};

export const DarkArticleRecommendationsList: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
