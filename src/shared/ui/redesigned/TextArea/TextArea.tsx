import React, {
    TextareaHTMLAttributes,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';

import { VStack } from '../Stack';
import { Text } from '../Text';
import cls from './TextArea.module.scss';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

type HTMLTextAreaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>;

interface TextareaProps extends HTMLTextAreaProps {
    className?: string;
    value?: string | number;
    label?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
}

export const TextArea = memo((props: TextareaProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        autofocus,
        readonly,
        label,
        ...otherProps
    } = props;
    const ref = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
    };

    const Textarea = (
        <textarea
            ref={ref}
            value={value}
            onChange={onChangeHandler}
            className={classNames(cls.Textarea, mods, [className])}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readonly}
            placeholder={placeholder}
            {...otherProps}
        />
    );

    if (label) {
        return (
            <VStack
                max
                gap="8"
            >
                <Text text={label} />
                {Textarea}
            </VStack>
        );
    }

    return Textarea;
});
