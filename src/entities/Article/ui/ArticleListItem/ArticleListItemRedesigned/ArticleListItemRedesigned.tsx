import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { ArticleTextBlock } from '../../../model/types/article';
import cls from './ArticleListItemRedesigned.module.scss';

import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import EyeIcon from '@/shared/assets/icons/eye-re.svg';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const { t } = useTranslation();

    const userInfo = (
        <>
            <Avatar
                width={32}
                height={32}
                src={article.user.avatar}
                className={cls.avatar}
            />
            <Text
                bold
                text={article.user.username}
            />
        </>
    );
    const views = (
        <HStack gap="8">
            <Icon svg={EyeIcon} />
            <Text
                text={String(article.views)}
                className={cls.views}
            />
        </HStack>
    );

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <Card
                padding="24"
                max
                data-testid="ArticleListItem"
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <VStack
                    max
                    gap="16"
                >
                    <HStack
                        gap="8"
                        max
                    >
                        {userInfo}
                        <Text text={formatDate(article.createdAt)} />
                    </HStack>
                    <Text
                        title={article.title}
                        bold
                    />
                    <Text
                        title={article.subtitle}
                        size="s"
                    />
                    <AppImage
                        fallback={
                            <Skeleton
                                width="100%"
                                height={250}
                            />
                        }
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    />
                    {textBlock?.paragraphs && (
                        <Text
                            className={cls.textBlock}
                            text={textBlock.paragraphs.slice(0, 2).join(' ')}
                        />
                    )}
                    <HStack
                        max
                        justify="between"
                    >
                        <AppLink
                            target={target}
                            to={getRouteArticleDetails(article.id)}
                        >
                            <Button variant="outline">
                                {t('Читати далі')}
                            </Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
        >
            <Card
                padding="0"
                className={cls.card}
                border="round"
            >
                <AppImage
                    fallback={
                        <Skeleton
                            width="100%"
                            height={200}
                        />
                    }
                    alt={article.title}
                    src={article.img}
                    className={cls.img}
                />
                <VStack
                    className={cls.info}
                    gap="4"
                >
                    <Text
                        title={article.title}
                        className={cls.title}
                    />
                    <VStack
                        gap="4"
                        className={cls.footer}
                        max
                    >
                        <HStack
                            justify="between"
                            max
                        >
                            <Text
                                text={formatDate(article.createdAt)}
                                className={cls.date}
                            />
                            {views}
                        </HStack>
                        <HStack gap="4">{userInfo}</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
