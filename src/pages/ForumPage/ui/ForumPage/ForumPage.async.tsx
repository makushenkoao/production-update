import { lazy } from 'react';

export const ForumPageAsync = lazy(async () => await import('./ForumPage'));
