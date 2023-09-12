import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook';
import { ArticleListItem } from './ArticleListItem';
import { ArticleView } from '../../model/consts/consts';
import { Theme } from '@/shared/const/theme';
import { ARTICLE_MOCK } from '../../model/consts/mock';

const meta: Meta<typeof ArticleListItem> = {
    title: 'entities/Article/ArticleListItem',
    component: ArticleListItem,
    args: {
        article: ARTICLE_MOCK,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticleListItemViewSmall: Story = {
    args: {
        view: ArticleView.SMALL,
    },
};

export const LightArticleListItemViewBig: Story = {
    args: {
        view: ArticleView.BIG,
    },
};

export const DarkArticleListItemViewSmall: Story = {
    args: {
        view: ArticleView.SMALL,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const DarkArticleListItemViewBig: Story = {
    args: {
        view: ArticleView.BIG,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
