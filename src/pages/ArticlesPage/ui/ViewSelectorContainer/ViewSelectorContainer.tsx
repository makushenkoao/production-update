import React from 'react';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

import { ArticleViewSelector } from '@/features/articleViewSelector';

export const ViewSelectorContainer = ({
    className,
}: {
    className?: string;
}) => {
    const { view, onChangeView } = useArticleFilters();

    return (
        <ArticleViewSelector
            className={className}
            view={view}
            onViewClick={onChangeView}
        />
    );
};
