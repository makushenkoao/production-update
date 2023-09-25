import { lazy } from 'react';

export const SavedArticlesAsync = lazy(async () => await import('./SavedArticles'));
