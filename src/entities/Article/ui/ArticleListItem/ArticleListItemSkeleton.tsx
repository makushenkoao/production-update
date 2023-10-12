import { memo } from 'react';

import { ArticleView } from '../../model/consts/consts';
import { ArticleListItemRedesignedSkeleton } from './ArticleListItemRedesigned';

export interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        return <ArticleListItemRedesignedSkeleton {...props} />;
    },
);
