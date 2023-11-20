import { lazy } from 'react';

export const InteractiveTaskPageAsync = lazy(
    async () => await import('./InteractiveTaskPage'),
);
