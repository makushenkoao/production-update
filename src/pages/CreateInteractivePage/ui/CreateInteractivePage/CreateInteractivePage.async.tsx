import { lazy } from 'react';

export const CreateInteractivePageAsync = lazy(
    async () => await import('./CreateInteractivePage'),
);
