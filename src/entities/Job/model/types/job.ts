import { User } from '@/entities/User';
import { JobCategory } from '@/shared/const/job';

export interface Job {
    id: string;
    user: User;
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
}