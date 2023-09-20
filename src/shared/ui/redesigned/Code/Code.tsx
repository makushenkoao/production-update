import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIconNew from '@/shared/assets/icons/copy-re.svg';
import cls from './Code.module.scss';
import { Icon } from '../Icon';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { t } = useTranslation();
    const { className, text } = props;
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000); // Устанавливаем таймер на 2 секунды (2000 миллисекунд)
        });
    }, [text]);

    return (
        <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
            <Icon
                clickable
                onClick={onCopy}
                className={cls.copyBtn}
                svg={CopyIconNew}
            />
            <code>{text}</code>
            {isCopied && <div className={cls.copiedMessage}>{t('Скопійовано')}</div>}
        </pre>
    );
});
