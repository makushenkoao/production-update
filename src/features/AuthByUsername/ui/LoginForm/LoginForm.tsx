import { memo, useState } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { loginReducer } from '../../model/slice/loginSlice';
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;
