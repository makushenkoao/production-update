import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmojiPicker, {
    EmojiClickData,
    Theme as EmojiTheme,
} from 'emoji-picker-react';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { getUserAuthData } from '@/entities/User';
import { useWriteMessageMutation } from '../../api/messageApi';
import SendIcon from '@/shared/assets/icons/send.svg';
import cls from './MessageForm.module.scss';
import EmojiIcon from '@/shared/assets/icons/emoji.svg';
import { usePressKey } from '@/shared/lib/hooks/usePressKey/usePressKey';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';

export const MessageForm = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const { theme } = useTheme();
    const authData = useSelector(getUserAuthData);
    const [message, setMessage] = useState<string>('');
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    const [writeMessage] = useWriteMessageMutation();

    usePressKey(() => {
        setIsPickerVisible(false);
    }, 'Escape');

    const onChange = useCallback((v: string) => {
        setMessage(v);
    }, []);

    const onSendMessage = useCallback(() => {
        writeMessage({
            sendAt: Date.now(),
            message,
            id: Date.now().toString(),
            fromUser: authData?.id ?? '',
            toUser: id ?? '',
        }).unwrap();
        setMessage('');
    }, [authData?.id, id, message, writeMessage]);

    const onEmojiClick = useCallback((data: EmojiClickData) => {
        setMessage((prevState) => prevState + data.emoji);
    }, []);

    const onClickIcon = useCallback(() => {
        setIsPickerVisible((prevState) => !prevState);
    }, []);

    return (
        <Card
            max
            padding="24"
        >
            <HStack
                gap="16"
                className={cls.form}
            >
                <Input
                    placeholder={t('Введіть повідомлення')}
                    onChange={onChange}
                    value={message}
                />
                <Icon
                    svg={EmojiIcon}
                    clickable
                    onClick={onClickIcon}
                />
                {isPickerVisible && (
                    <div className={cls.emoji}>
                        <EmojiPicker
                            onEmojiClick={onEmojiClick}
                            theme={(theme === Theme.DARK ? 'dark' : 'light') as EmojiTheme}
                        />
                    </div>
                )}
                <Icon
                    svg={SendIcon}
                    clickable
                    onClick={onSendMessage}
                />
            </HStack>
        </Card>
    );
};
