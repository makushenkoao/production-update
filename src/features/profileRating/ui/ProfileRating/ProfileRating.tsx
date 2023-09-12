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

export interface ProfileRatingProps {
    className?: string;
}

const ProfileRating = (props: ProfileRatingProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const { id } = useParams<{ id: string }>();

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
            window.location.reload();
        },
        [handleRateArticle],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
            window.location.reload();
        },
        [handleRateArticle],
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
