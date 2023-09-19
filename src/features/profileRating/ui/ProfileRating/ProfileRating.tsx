import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { RatingCard } from '@/entities/Rating';
import {
    useGetProfileRatingQuery,
    useRateProfileMutation,
} from '../../api/profileRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { sendNotification } from '@/entities/Notification';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export interface ProfileRatingProps {
    className?: string;
}

const ProfileRating = (props: ProfileRatingProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const { isLoading, error, data } = useGetProfileRatingQuery({
        profileId: id,
        userId: userData?.id ?? '',
    });

    const [rateArticleMutation] = useRateProfileMutation();

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    userId: userData?.id ?? '',
                    profileId: id,
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [id, rateArticleMutation, userData?.id],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
            dispatch(
                sendNotification({
                    id: Date.now().toString(),
                    title: `${userData?.username} оцінив ваш профіль на ${starsCount}/5`,
                    description: feedback || '',
                    userId: id,
                }),
            );
        },
        [dispatch, handleRateArticle, id, userData?.username],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
            dispatch(
                sendNotification({
                    id: Date.now().toString(),
                    title: `${userData?.username} оцінив ваш профіль на ${starsCount}/5`,
                    description: 'Користувач не надав Вам фідбеку',
                    userId: id,
                }),
            );
        },
        [dispatch, handleRateArticle, id, userData?.username],
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
    if (String(userData?.id) === id) return null;

    return (
        <RatingCard
            className={classNames('', {}, [className])}
            title={t('Оцініть профіль')}
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

export default memo(ProfileRating);
