import { Forum } from '../..';

export interface ForumDetailsSchema {
    data?: Forum;
    isLoading?: boolean;
    error?: string
}
