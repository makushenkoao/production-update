import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Message } from '../../model/types/message';
import { useDeleteMessageMutation } from '../../api/messageApi';

import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { getUserAuthData } from '@/entities/User';
import { formatTime } from '@/shared/lib/utils/formatTime/formatTime';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { DropdownItem } from '@/shared/ui/redesigned/Popups/components/Dropdown/Dropdown';

interface MessageBoxProps {
    message: Message;
}

export const MessageBox = (props: MessageBoxProps) => {
    const {
        message: { message, id, sendAt, toUser, fromUser },
    } = props;
    const authData = useSelector(getUserAuthData);
    const { t } = useTranslation();
    const [deleteMessage] = useDeleteMessageMutation();

    const isFromUser = fromUser === authData?.id;

    const onDelete = useCallback(() => {
        deleteMessage(id);
    }, [deleteMessage, id]);

    const items = useMemo<DropdownItem[]>(
        () => [
            {
                content: (
                    <Text
                        variant="error"
                        text={t('Видалити')}
                    />
                ),
                onClick: onDelete,
            },
        ],
        [onDelete, t],
    );

    return (
        <VStack
            gap="8"
            max
            align={isFromUser ? 'end' : 'start'}
        >
            {fromUser === authData?.id ? (
                <Dropdown
                    trigger={
                        <Card variant="outlined">
                            <Text text={message} />
                        </Card>
                    }
                    items={items}
                    direction="bottom left"
                />
            ) : (
                <Card variant="light">
                    <Text text={message} />
                </Card>
            )}
            <Text text={formatTime(sendAt)} />
        </VStack>
    );
};
