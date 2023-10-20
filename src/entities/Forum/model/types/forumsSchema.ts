import {EntityState} from "@reduxjs/toolkit";

import {Forum} from '../..';

export interface ForumsSchema extends EntityState<Forum>{
    isLoading?: boolean;
    error?: string;
    page: number;
    limit: number;
    hasMore: boolean;
    _inited: boolean;
    search: string;
}
