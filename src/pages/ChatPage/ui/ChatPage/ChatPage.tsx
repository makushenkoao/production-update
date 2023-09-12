import { VStack } from '@/shared/ui/redesigned/Stack';
import { ChatPageHeader } from './ChatPageHeader/ChatPageHeader';
import { MessageForm } from '@/entities/Message';
import { MessagesList } from '@/features/messagesList';
import cls from './ChatPage.module.scss';

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
