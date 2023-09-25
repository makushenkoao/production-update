import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { Button } from '@/shared/ui/redesigned/Button';
import { registerActions } from '../../../model/slice/registerSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getRegisterFirstname,
    getRegisterIsLoading,
    getRegisterLastname,
    getRegisterPassword,
    getRegisterUsername,
} from '../../../model/selectors/register';
import {
    useRegisterProfileMutation,
    useRegisterUserMutation,
} from '../../../api/register';
import { userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../LoginForm.module.scss';

interface RegisterProps {
    setIsRegister: Dispatch<SetStateAction<boolean>>;
    onSuccess: () => void;
    className?: string;
}

export const Register = (props: RegisterProps) => {
    const { setIsRegister, onSuccess, className } = props;
    const { t } = useTranslation();
    const forceUpdate = useForceUpdate();
    const dispatch = useAppDispatch();
    const registerUsername = useSelector(getRegisterUsername);
    const registerFirstname = useSelector(getRegisterFirstname);
    const registerLastname = useSelector(getRegisterLastname);
    const registerPassword = useSelector(getRegisterPassword);
    const registerIsLoading = useSelector(getRegisterIsLoading);
    const [registerProfileMutation] = useRegisterProfileMutation();
    const [registerUserMutation] = useRegisterUserMutation();

    const onChangeRegisterFirstname = useCallback(
        (v: string) => {
            dispatch(registerActions.setFirstname(v));
        },
        [dispatch],
    );

    const onChangeRegisterLastname = useCallback(
        (v: string) => {
            dispatch(registerActions.setLastname(v));
        },
        [dispatch],
    );

    const onChangeRegisterUsername = useCallback(
        (v: string) => {
            dispatch(registerActions.setUsername(v));
        },
        [dispatch],
    );

    const onChangeRegisterPassword = useCallback(
        (v: string) => {
            dispatch(registerActions.setPassword(v));
        },
        [dispatch],
    );

    const onRegister = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const id = String(Date.now());

            const data = {
                id,
                username: registerUsername,
                firstname: registerFirstname,
                lastname: registerLastname,
                following: [],
                followers: [],
                saved: [],
            };

            registerProfileMutation(data)
                .then(() => {
                    registerUserMutation({
                        id,
                        username: registerUsername,
                        password: registerPassword,
                    });
                })
                .then(() => {
                    dispatch(userActions.setAuthData(data));
                    onSuccess();
                    forceUpdate();
                })
                .catch((error) => {
                    console.error('Error while register:', error);
                });
        },
        [
            dispatch,
            forceUpdate,
            onSuccess,
            registerFirstname,
            registerLastname,
            registerPassword,
            registerProfileMutation,
            registerUserMutation,
            registerUsername,
        ],
    );

    return (
        <form
            onSubmit={onRegister}
            className={classNames(cls.LoginFormRedesigned, {}, [className])}
        >
            <VStack
                max
                gap="16"
            >
                <Text title={t('Форма реєстрації')} />
                <Input
                    autofocus
                    placeholder={t("Введіть ім'я")}
                    onChange={onChangeRegisterFirstname}
                    value={registerFirstname}
                />
                <Input
                    placeholder={t('Введіть прізвище')}
                    onChange={onChangeRegisterLastname}
                    value={registerLastname}
                />
                <Input
                    placeholder={t('Введіть юзернейм')}
                    onChange={onChangeRegisterUsername}
                    value={registerUsername}
                />
                <Input
                    type="password"
                    placeholder={t('Введіть пароль')}
                    onChange={onChangeRegisterPassword}
                    value={registerPassword}
                />
                <VStack
                    max
                    align="end"
                    gap="8"
                >
                    <Button
                        variant="outline"
                        type="submit"
                        disabled={registerIsLoading}
                    >
                        {t('Зареєструватися')}
                    </Button>
                    <Button
                        variant="clear"
                        onClick={() => setIsRegister((prevState) => !prevState)}
                    >
                        {t('Увійти')}
                    </Button>
                </VStack>
            </VStack>
        </form>
    );
};
