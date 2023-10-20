import { memo } from 'react';

import { Forum } from '../..';
import { ForumItem } from '../ForumItem/ForumItem';
import { ForumListSkeleton } from './ForumListSkeleton/ForumListSkeleton';

import { VStack } from '@/shared/ui/redesigned/Stack';

interface ForumListProps {
    forums?: Forum[];
    loading?: boolean;
    error?: string;
}

export const ForumList = memo((props: ForumListProps) => {
    const { forums, error, loading } = props;

    if (loading) {
        return <ForumListSkeleton />;
    }

    return (
        <VStack
            max
            gap="16"
        >
            {forums?.map((item) => (
                <ForumItem
                    forum={item}
                    key={item.id}
                />
            ))}
        </VStack>
    );
});
