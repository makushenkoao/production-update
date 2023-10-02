import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EditableProfileCard, getProfileForm } from '@/features/editableProfileCard';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UserArticles } from '@/features/userArticles';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { useGetProfileDataQuery } from '@/entities/Profile';
import { blockProfile } from '../model/services/blockProfile/blockProfile';
import { followProfile } from '../model/services/followProfile/followProfile';

const ProfilePage = () => {
    const [userIsBlocked, setUserIsBlocked] = useState<boolean | undefined>(
        false,
    );
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const formData = useSelector(getProfileForm);
    const { data, refetch } = useGetProfileDataQuery(authData?.id);

    const { id } = useParams<{
        id: string;
    }>();

    useEffect(() => {
        const isBlocked = data?.blockedUsers?.includes(formData?.id || '');
        setUserIsBlocked(isBlocked);
    }, [data?.blockedUsers, formData?.id]);

    const onBlockUser = useCallback(() => {
        setLoading(true);
        dispatch(blockProfile())
            .then(() => {
                refetch();
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch, refetch]);

    const onFollow = useCallback(() => {
        setLoading(true);
        dispatch(followProfile()).finally(() => {
            setLoading(false);
        });
    }, [dispatch]);

    return (
        <Page data-testid="ProfilePage">
            <VStack gap="32">
                <EditableProfileCard
                    onBlockUser={onBlockUser}
                    userIsBlocked={userIsBlocked}
                    id={id}
                    onFollow={onFollow}
                    loading={loading}
                />
                {!userIsBlocked && <UserArticles />}
            </VStack>
        </Page>
    );
};

export default ProfilePage;
