import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Profile } from '../../model/types/profile';
import { ProfileCardRedesigned } from './ProfileCardRedesigned';

type onChangeInput = (v?: string) => void;

export interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    onChangeFirstname?: onChangeInput;
    onChangeLastname?: onChangeInput;
    onChangeCity?: onChangeInput;
    onChangeAge?: onChangeInput;
    onChangeUsername?: onChangeInput;
    onChangeAvatar?: onChangeInput;
    onChangeCurrency?: (v: Currency) => void;
    onChangeCountry?: (v: Country) => void;
    readonly?: boolean;
}

export const ProfileCard = (props: ProfileCardProps) => {
    return <ProfileCardRedesigned {...props} />;
};
