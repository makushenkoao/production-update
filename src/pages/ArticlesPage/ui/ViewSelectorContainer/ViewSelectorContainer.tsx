import React from 'react';
import { ArticleViewSelector } from '@/features/articleViewSelector';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

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
