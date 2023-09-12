import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { ArticleDetails } from './ArticleDetails';
import { ARTICLE_MOCK } from '../../model/consts/mock';
import { Theme } from '@/shared/const/theme';

const meta: Meta<typeof ArticleDetails> = {
    title: 'entities/Article/ArticleDetails',
    component: ArticleDetails,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticleDetailsData: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            articleDetails: {
                data: ARTICLE_MOCK,
            },
        }),
    ],
};

export const DarkArticleDetailsData: Story = {
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

export const LightArticleDetailsLoading: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            articleDetails: {
                isLoading: true,
            },
        }),
    ],
};

export const DarkArticleDetailsLoading: Story = {
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

export const LightArticleDetailsError: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            articleDetails: {
                error: 'error',
            },
        }),
    ],
};

export const DarkArticleDetailsError: Story = {
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
