import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIconNew from '@/shared/assets/icons/copy-re.svg';
import cls from './Code.module.scss';
import { Icon } from '../Icon';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre
                            className={classNames(cls.CodeRedesigned, {}, [className])}
                        >
                            <Icon
                                clickable
                                onClick={onCopy}
                                className={cls.copyBtn}
                                svg={CopyIconNew}
                            />
                            <code>{text}</code>
                        </pre>
    );
});
