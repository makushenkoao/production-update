import { lazy } from 'react';

export const JobsPageAsync = lazy(async () => await import('./JobsPage'));
