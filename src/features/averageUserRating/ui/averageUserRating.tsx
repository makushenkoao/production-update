import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProfileRatingByIdQuery } from '../api/averageProfileRatingApi';

import { HStack } from '@/shared/ui/redesigned/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';

export const AverageUserRating = ({ className }: { className?: string }) => {
    const { id } = useParams<{
        id?: string;
    }>();

    const [averageRating, setAverageRating] = useState<number>();

    const { isLoading, error, data } = useGetProfileRatingByIdQuery({
        profileId: id,
    });

    useEffect(() => {
        if (!data) return;
        const ratings = data.map((item) => item.rate);
        const sumOfRatings = ratings.reduce(
            (total, rating) => total + rating,
            0,
        );
        const averageRating = Number(
            (sumOfRatings / ratings.length).toFixed(1),
        );
        setAverageRating(averageRating || 0);
    }, [data]);

    return (
        <HStack
            className={className}
            gap="4"
            align="start"
        >
            {averageRating}
            <Icon
                svg={StarIcon}
                width={20}
                height={20}
            />
        </HStack>
    );
};
