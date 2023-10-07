import { Job } from '../../model/types/job';

export interface JobDetailsSchema {
    isLoading?: boolean;
    error?: string;
    data?: Job;
}
