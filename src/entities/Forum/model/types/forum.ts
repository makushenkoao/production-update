import { User } from '@/entities/User';

export enum FormCategory {
    IT = 'IT',
    SCIENCE = 'Science',
}

export interface ForumReply {
    id: string;
    userId?: string;
    user?: User;
    content: string;
    createdAt: number;
}

export interface Forum {
    id: string;
    title: string;
    description: string;
    userId?: string;
    user?: User;
    reply?: ForumReply[];
    createdAt: number;
    category: FormCategory;
}
