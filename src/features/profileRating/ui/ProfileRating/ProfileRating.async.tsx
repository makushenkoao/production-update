import { lazy, Suspense } from 'react';
import { ProfileRatingProps } from './ProfileRating';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

export const ProfileRatingLazy = lazy(
    async () => await import('./ProfileRating'),
);

export const ProfileRatingAsync = (props: ProfileRatingProps) => (
    <Suspense
        fallback={
            <SkeletonRedesigned
                width="100%"
                height={120}
            />
        }
    >
        <ProfileRatingLazy {...props} />
    </Suspense>
);
