import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { registerReducer } from '../../model/slice/registerSlice';
import { Register } from './Register/Register';
import { Login } from './Login/Login';

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

    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterUnmount
        >
            <VStack
                gap="16"
                className={classNames(cls.LoginFormRedesigned, {}, [className])}
                max
            >
                {isRegister ? (
                    <Register
                        setIsRegister={setIsRegister}
                        onSuccess={onSuccess}
                    />
                ) : (
                    <Login
                        setIsRegister={setIsRegister}
                        onSuccess={onSuccess}
                    />
                )}
            </VStack>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
