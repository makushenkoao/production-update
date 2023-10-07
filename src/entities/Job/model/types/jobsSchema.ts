import {EntityState} from "@reduxjs/toolkit";
import { Job } from '../../model/types/job';

export interface JobsSchema extends EntityState<Job> {
    isLoading?: boolean;
    error?: string;
    page: number;
    limit: number;
    hasMore: boolean;
    _inited: boolean;
    search: string;
}
