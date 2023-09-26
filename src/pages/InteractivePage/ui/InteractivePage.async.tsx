import { lazy } from 'react';

export const InteractivePageAsync = lazy(async () => await import('./InteractivePage'));
