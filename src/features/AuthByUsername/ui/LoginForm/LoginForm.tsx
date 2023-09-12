import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';


import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import cls from './LoginForm.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import {
    getRegisterFirstname,
    getRegisterIsLoading,
    getRegisterLastname,
    getRegisterPassword,
    getRegisterUsername,
} from '../../model/selectors/register';
import {
    registerActions,
    registerReducer,
} from '../../model/slice/registerSlice';
import { register } from '../../model/services/register';

interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
    registerForm: registerReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const { onSuccess, className } = props;
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);
    const registerUsername = useSelector(getRegisterUsername);
    const registerFirstname = useSelector(getRegisterFirstname);
    const registerLastname = useSelector(getRegisterLastname);
    const registerPassword = useSelector(getRegisterPassword);
    const registerIsLoading = useSelector(getRegisterIsLoading);
    const forceUpdate = useForceUpdate();

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

    const onChangeRegisterFirstname = useCallback((v: string) => {
        dispatch(registerActions.setFirstname(v));
    }, [dispatch]);

    const onChangeRegisterLastname = useCallback((v: string) => {
        dispatch(registerActions.setLastname(v));
    }, [dispatch]);

    const onChangeRegisterUsername = useCallback((v: string) => {
        dispatch(registerActions.setUsername(v));
    }, [dispatch]);

    const onChangeRegisterPassword = useCallback((v: string) => {
        dispatch(registerActions.setPassword(v));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
        }
    }, [dispatch, onSuccess, password, username, forceUpdate]);

    const onRegisterClick = useCallback(async () => {
        const user = {
            password: registerPassword,
            username: registerUsername,
            firstname: registerFirstname,
            lastname: registerLastname,
        }
        const result = await dispatch(
            register(user),
        );
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
        }
    }, [
        dispatch,
        onSuccess,
        forceUpdate,
        registerPassword,
        registerUsername,
        registerFirstname,
        registerLastname,
    ]);

    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterUnmount
        >
            <VStack
                                    gap="16"
                                    className={classNames(cls.LoginFormRedesigned, {}, [
                                        className,
                                    ])}
                                    max
                                >
                                    {isRegister ? (
                                        <>
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
                                                    onClick={onRegisterClick}
                                                    disabled={registerIsLoading}
                                                >
                                                    {t('Зареєструватися')}
                                                </Button>
                                                <Button
                                                    variant="clear"
                                                    onClick={() =>
                                                        setIsRegister(
                                                            (prevState) => !prevState,
                                                        )
                                                    }
                                                >
                                                    {t('Увійти')}
                                                </Button>
                                            </VStack>
                                        </>
                                    ) : (
                                        <>
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
                                                    onClick={onLoginClick}
                                                    disabled={isLoading}
                                                >
                                                    {t('Увійти')}
                                                </Button>
                                                <Button
                                                    variant="clear"
                                                    onClick={() =>
                                                        setIsRegister(
                                                            (prevState) => !prevState,
                                                        )
                                                    }
                                                >
                                                    {t('Зареєструватися')}
                                                </Button>
                                            </VStack>
                                        </>
                                    )}
                                </VStack>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
