import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Message } from '../../model/types/message';
import { getUserAuthData } from '@/entities/User';
import { formatTime } from '@/shared/lib/utils/formatTime/formatTime';

interface MessageBoxProps {
    message: Message;
}

export const MessageBox = (props: MessageBoxProps) => {
    const {
        message: { message, id, sendAt, toUser, fromUser },
    } = props;
    const authData = useSelector(getUserAuthData);

    const isFromUser = fromUser === authData?.id;

    return (
        <VStack
            gap="8"
            max
            align={isFromUser ? 'end' : 'start'}
        >
            <Card variant={isFromUser ? 'outlined' : 'light'}>
                <Text text={message} />
            </Card>
            <Text text={formatTime(sendAt)} />
        </VStack>
    );
};
