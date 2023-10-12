import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getLoginUsername } from '../../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginActions } from '../../../model/slice/loginSlice';
import { loginByUsername } from '../../../model/services/loginByUsername/loginByUsername';
import cls from '../LoginForm.module.scss';

import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classNames/classNames';

interface LoginProps {
    setIsRegister: Dispatch<SetStateAction<boolean>>;
    onSuccess: () => void;
    className?: string;
}

export const Login = (props: LoginProps) => {
    const { setIsRegister, onSuccess, className } = props;
    const { t } = useTranslation();
    const forceUpdate = useForceUpdate();
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const onChangeUsername = useCallback(
        (v: string) => {
            dispatch(loginActions.setUsername(v));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (v: string) => {
            dispatch(loginActions.setPassword(v));
        },
        [dispatch],
    );

    const onLogin = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!username || !password) return;
            const result = await dispatch(
                loginByUsername({ username, password }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess();
                forceUpdate();
            }
        },
        [dispatch, onSuccess, password, username, forceUpdate],
    );

    return (
        <form
            onSubmit={onLogin}
            className={classNames(cls.LoginFormRedesigned, {}, [className])}
        >
            <VStack
                max
                gap="16"
            >
                <Text title={t('Форма авторизації')} />
                {error && (
                    <Text
                        text={t('Невірний логін або пароль :(')}
                        variant="error"
                    />
                )}
                <Input
                    placeholder={t('Введіть юзернейм')}
                    autofocus
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type="password"
                    placeholder={t('Введіть пароль')}
                    onChange={onChangePassword}
                    value={password}
                />
                <VStack
                    max
                    align="end"
                    gap="8"
                >
                    <Button
                        variant="outline"
                        type="submit"
                        disabled={isLoading}
                    >
                        {t('Увійти')}
                    </Button>
                    <Button
                        variant="clear"
                        onClick={() => setIsRegister((prevState) => !prevState)}
                    >
                        {t('Зареєструватися')}
                    </Button>
                </VStack>
            </VStack>
        </form>
    );
};
