import { ChatPageHeader } from './ChatPageHeader/ChatPageHeader';
import cls from './ChatPage.module.scss';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { MessageForm } from '@/entities/Message';
import { MessagesList } from '@/features/messagesList';


const ChatPage = () => {
    return (
        <VStack
            gap="16"
            justify="between"
            className={cls.ChatPage}
        >
            <ChatPageHeader />
            <MessagesList />
            <MessageForm />
        </VStack>
    );
};

export default ChatPage;
