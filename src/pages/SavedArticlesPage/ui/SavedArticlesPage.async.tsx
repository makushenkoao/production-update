import { lazy } from 'react';

export const SavedArticlesPageAsync = lazy(
    async () => await import('./SavedArticlesPage'),
);
