import { Job } from '../..';

export interface JobsSchema {
    isLoading?: boolean;
    error?: string;
    data?: Job[];
}
