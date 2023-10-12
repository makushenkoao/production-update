import React from 'react';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const InteractiveTaskPageSkeleton = () => {
    return (
        <VStack
            max
            gap="16"
        >
            <Skeleton
                width={200}
                height={30}
            />

            <Skeleton
                width={500}
                height={50}
            />
            <Skeleton
                width={500}
                height={50}
            />
            <Skeleton
                width={500}
                height={50}
            />
        </VStack>
    );
};
