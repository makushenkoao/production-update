import { User } from '@/entities/User';
import { JobCategory } from '@/shared/const/job';

export interface JobResponse {
    id: string;
    userId: string;
    description: string;
    // file: File
}

export interface Job {
    id: string;
    userId?: string;
    user?: User;
    title: string;
    company: string;
    aboutCompany: string;
    location: string;
    description: string;
    responsibilities: string;
    requirements: string;
    salary: string;
    type: string;
    createdAt: number;
    email: string;
    phone: string;
    experience: string;
    category: JobCategory[];
    views: number;
    website?: string;
    responses: JobResponse[];
}

export type FieldName =
    | 'title'
    | 'salary'
    | 'type'
    | 'experience'
    | 'description'
    | 'responsibilities'
    | 'requirements'
    | 'category'
    | 'company'
    | 'aboutCompany'
    | 'location'
    | 'email'
    | 'phone'
    | 'website';
