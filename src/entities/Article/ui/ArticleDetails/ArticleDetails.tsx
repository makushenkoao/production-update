import { useTranslation } from 'react-i18next';
import { Fragment, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { renderBlock } from './renderBlock';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';
// TODO: fix circular dependency
// eslint-disable-next-line makushenkoao-plugin/public-api-imports
import { incrementViews } from '@/pages/ArticleDetailsPage/model/services/incrementViews/incrementViews';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <HStack
                justify="center"
                max
                className={cls.avatarWrapper}
            >
                <Avatar
                    width={200}
                    height={200}
                    src={article?.img}
                    className={cls.avatar}
                />
            </HStack>
            <VStack
                gap="4"
                max
                data-testid="ArticleDetails.Info"
            >
                <TextDeprecated
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <HStack
                    gap="8"
                    className={cls.articleInfo}
                >
                    <Icon
                        className={cls.icon}
                        svg={EyeIcon}
                    />
                    <TextDeprecated text={String(article?.views)} />
                </HStack>
                <HStack
                    gap="8"
                    className={cls.articleInfo}
                >
                    <Icon
                        className={cls.icon}
                        svg={CalendarIcon}
                    />
                    <TextDeprecated text={formatDate(article?.createdAt)} />
                </HStack>
            </VStack>
            {article?.blocks.map(renderBlock)}
        </>
    );
};

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(incrementViews(article));
    }, [article, dispatch]);

    return (
        <>
            <Text
                title={article?.title}
                size="l"
                bold
            />
            <Text title={article?.subtitle} />
            <AppImage
                fallback={
                    <SkeletonRedesigned
                        width="100%"
                        height={420}
                        borderRadius="16px"
                    />
                }
                src={article?.img}
                className={cls.img}
            />
            {article?.blocks.map(renderBlock)}
        </>
    );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    const Skeleton = SkeletonRedesigned;

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton
                    className={cls.avatar}
                    width={200}
                    height={200}
                    borderRadius="50%"
                />
                <Skeleton
                    className={cls.title}
                    width={300}
                    height={32}
                />
                <Skeleton
                    className={cls.skeleton}
                    width={600}
                    height={24}
                />
                <Skeleton
                    className={cls.skeleton}
                    width="100%"
                    height={200}
                />
                <Skeleton
                    className={cls.skeleton}
                    width="100%"
                    height={200}
                />
            </>
        );
    } else if (error) {
        content = (
            <Text
                align="center"
                title={t('Помилка сервера')}
            />
        );
    } else {
        content = <Redesigned />;
    }

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <VStack
                gap="16"
                max
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
