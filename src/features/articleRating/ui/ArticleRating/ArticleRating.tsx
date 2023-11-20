import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    useGetArticleRatingQuery,
    useRateArticleMutation,
} from '../../api/articleRatingApi';

import { classNames } from '@/shared/lib/classNames/classNames';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { getArticleDetailsData } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { sendNotification } from '@/entities/Notification';
import { getRouteArticleDetails } from '@/shared/const/router';

export interface ArticleRatingProps {
    className?: string;
    articleId?: string;
}

const ArticleRating = (props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const article = useSelector(getArticleDetailsData);

    const { isLoading, error, data } = useGetArticleRatingQuery({
        articleId,
        userId: userData?.id ?? '',
    });

    const [rateArticleMutation] = useRateArticleMutation();

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    userId: userData?.id ?? '',
                    articleId,
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [articleId, rateArticleMutation, userData?.id],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
            dispatch(
                sendNotification({
                    id: Date.now().toString(),
                    title: `${userData?.username} оцінив вашу статтю "${article?.title}" на ${starsCount}/5`,
                    description: feedback || '',
                    href: getRouteArticleDetails(articleId || ''),
                    userId: article?.user.id,
                }),
            );
        },
        [
            article?.title,
            article?.user.id,
            articleId,
            dispatch,
            handleRateArticle,
            userData?.username,
        ],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
            dispatch(
                sendNotification({
                    id: Date.now().toString(),
                    title: `${userData?.username} оцінив вашу статтю "${article?.title}" на ${starsCount}/5`,
                    description: 'Користувач не надав Вам фідбеку',
                    href: getRouteArticleDetails(articleId || ''),
                    userId: article?.user.id,
                }),
            );
        },
        [
            article?.title,
            article?.user.id,
            articleId,
            dispatch,
            handleRateArticle,
            userData?.username,
        ],
    );

    const Skeleton = SkeletonRedesigned;

    if (isLoading) {
        return (
            <Skeleton
                width="100%"
                height={120}
            />
        );
    }

    if (error) {
        // TODO - error
        return null;
    }

    const rating = data?.[0];

    return (
        <RatingCard
            className={classNames('', {}, [className])}
            title={t('Оцініть статтю')}
            feedbackTitle={t(
                'Напишіть свій відгук, який допоможе стати нам краще',
            )}
            hasFeedback
            rate={rating?.rate}
            onCancel={onCancel}
            onAccept={onAccept}
        />
    );
};

export default memo(ArticleRating);
