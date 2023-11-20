import { lazy } from 'react';

export const JobDetailsPageAsync = lazy(
    async () => await import('./JobDetailsPage'),
);
