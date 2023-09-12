import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { getUserAuthData } from '@/entities/User';
import { useWriteMessageMutation } from '../../api/messageApi';
import SendIcon from '@/shared/assets/icons/send.svg';

export const MessageForm = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const authData = useSelector(getUserAuthData);
    const [message, setMessage] = useState<string>('');

    const [writeMessage] = useWriteMessageMutation();

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

    return (
        <Card
            max
            padding="24"
        >
            <HStack gap="16">
                <Input
                    placeholder={t('Введіть повідомлення')}
                    onChange={onChange}
                    value={message}
                />
                <Icon
                    svg={SendIcon}
                    clickable
                    onClick={onSendMessage}
                />
            </HStack>
        </Card>
    );
};
