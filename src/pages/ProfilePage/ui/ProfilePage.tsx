import { useParams } from 'react-router-dom';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UserArticles } from '@/features/userArticles';

const ProfilePage = () => {
    const { id } = useParams<{
        id: string;
    }>();

    return (
        <Page data-testid="ProfilePage">
            <VStack gap="32">
                <EditableProfileCard id={id} />
                <UserArticles />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
