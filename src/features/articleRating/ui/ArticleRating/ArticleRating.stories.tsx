import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import ArticleRating from './ArticleRating';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const meta: Meta<typeof ArticleRating> = {
    title: 'pages/ProfileRating',
    component: ArticleRating,
    decorators: [StoreDecorator({})],
    parameters: {
        mockData: [
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

export const LightArticleRating: Story = {
    args: {},
};

export const DarkArticleRating: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
