import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Article } from '@/entities/Article';

export interface Profile {
    id?: string;
    firstname?: string;
    lastname?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
    rate?: number;
    followers?: string[];
    following?: string[];
    saved?: string[];
    blockedUsers?: string[];
    archive?: Article[];
}
