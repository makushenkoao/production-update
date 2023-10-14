import { JobCategory } from '../../const/job';

import { User } from '@/entities/User';

export interface JobResponse {
    id: string;
    userId: string;
    description?: string;
    href?: string;
}

export interface Job {
    id: string;
    userId?: string;
    user?: User;
    title: string;
    company: string;
    aboutCompany: string;
    country: string;
    city: string;
    address: string;
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
    | 'country'
    | 'city'
    | 'address'
    | 'email'
    | 'phone'
    | 'website';
