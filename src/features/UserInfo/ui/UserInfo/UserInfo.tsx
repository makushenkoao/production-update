import { useGetUserByIdQuery } from '@/entities/User';
import { AvatarWithUsername } from '@/shared/ui/redesigned/AvatarWithUsername';

export const UserInfo = ({ userId }: { userId: string }) => {
    const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);

    if (isLoading) {
        return null;
    }

    if (isError) {
        return null;
    }

    return (
        <AvatarWithUsername
            src={user?.avatar}
            username={user?.username}
            size={50}
        />
    );
};
