import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Text } from '@/shared/ui/redesigned/Text';
import { ProfileCard } from '@/entities/Profile';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ValidateProfileError } from '../../model/consts/consts';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { profileActions, profileReducer } from '../../model/slice/ProfileSlice';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { getUserAuthData } from '@/entities/User';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface EditableProfileCardProps {
    className?: string;
    id?: string;
    userIsBlocked?: boolean;
    onBlockUser?: () => void;
    onFollow?: () => void;
    loading?: boolean;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id, onBlockUser, userIsBlocked, loading, onFollow } =
        props;
    const { t } = useTranslation();
    const [userIsFollowing, setUserIsFollowing] = useState<boolean | undefined>(
        false,
    );
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    useEffect(() => {
        const isFollowing = formData?.followers?.includes(authData?.id || '');
        setUserIsFollowing(isFollowing);
    }, [authData?.id, formData?.followers]);

    const validateErrorTranslate = {
        [ValidateProfileError.SERVER_ERROR]: t('Серверна помилка'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некоректний вік'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t(
            "Ім'я та прізвище обов'язкові",
        ),
        [ValidateProfileError.NO_DATA]: t('Дані не вказані'),
    };

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            if (id) {
                dispatch(fetchProfileData(id));
            }
        }
    }, [dispatch, id]);

    const onChangeFirstname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ firstname: value }));
        },
        [dispatch],
    );

    const onChangeLastname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastname: value }));
        },
        [dispatch],
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ city: value }));
        },
        [dispatch],
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ age: Number(value) || 0 }));
        },
        [dispatch],
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ username: value }));
        },
        [dispatch],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ avatar: value }));
        },
        [dispatch],
    );

    const onChangeCurrency = useCallback(
        (currency: Currency) => {
            dispatch(profileActions.updateProfile({ currency }));
        },
        [dispatch],
    );

    const onChangeCountry = useCallback(
        (country: Country) => {
            dispatch(profileActions.updateProfile({ country }));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <VStack
                max
                gap="16"
                className={classNames('', {}, [className])}
            >
                <EditableProfileCardHeader
                    onFollowClick={onFollow}
                    userIsFollowing={userIsFollowing}
                    isLoading={loading}
                    isBlocked={userIsBlocked}
                    onBlockUser={onBlockUser}
                />
                {validateErrors?.length &&
                    validateErrors.map((error) => (
                        <Text
                            key={error}
                            variant="error"
                            text={validateErrorTranslate[error]}
                            data-testid="EditableProfileCard.Error"
                        />
                    ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    readonly={readonly}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                    isBlocked={userIsBlocked}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
