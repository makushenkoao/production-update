import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import cls from './ForumDetailsAdditionalInfo.module.scss';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { deleteForumDetailsService, Forum } from '@/entities/Forum';
import { getUserAuthData } from '@/entities/User';
import { AvatarWithUsername } from '@/shared/ui/redesigned/AvatarWithUsername';
import { Text } from '@/shared/ui/redesigned/Text';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    getRouteForum,
    getRouteForumEdit,
    getRouteProfile,
} from '@/shared/const/router';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ForumDetailsAdditionalInfoProps {
    forum?: Forum;
    loading?: boolean;
}

export const ForumDetailsAdditionalInfo = memo(
    (props: ForumDetailsAdditionalInfoProps) => {
        const { forum, loading } = props;
        const { t } = useTranslation();
        const [loadingService, setLoadingService] = useState(false);
        const dispatch = useAppDispatch();
        const authData = useSelector(getUserAuthData);
        const navigate = useNavigate();

        const onNavigate = useCallback(() => {
            navigate(getRouteProfile(forum?.userId || ''));
        }, [forum?.userId, navigate]);

        const onDelete = useCallback(() => {
            setLoadingService(true);
            dispatch(deleteForumDetailsService(forum?.id))
                .then(() => navigate(getRouteForum()))
                .finally(() => {
                    setLoadingService(false);
                });
        }, [dispatch, forum?.id, navigate]);

        const onEdit = useCallback(() => {
            navigate(getRouteForumEdit(forum?.id || ''));
        }, [forum?.id, navigate]);

        if (loading) {
            return (
                <Card
                    className={cls.cards}
                    border="round"
                    max
                    padding="24"
                >
                    <VStack
                        max
                        gap="16"
                    >
                        <Skeleton
                            height={30}
                            borderRadius="12px"
                        />
                        <Skeleton
                            height={30}
                            borderRadius="12px"
                        />
                        <Skeleton
                            height={30}
                            borderRadius="12px"
                        />
                    </VStack>
                </Card>
            );
        }

        return (
            <VStack
                className={cls.cards}
                gap="16"
            >
                {authData?.id === forum?.userId && (
                    <Card
                        border="round"
                        max
                        padding="24"
                    >
                        <VStack
                            max
                            gap="16"
                        >
                            <Button
                                fullWidth
                                disabled={loadingService}
                                onClick={onEdit}
                            >
                                {t('Редагувати')}
                            </Button>
                            <Button
                                color="error"
                                fullWidth
                                disabled={loadingService}
                                onClick={onDelete}
                            >
                                {t('Видалити')}
                            </Button>
                        </VStack>
                    </Card>
                )}
                <Card
                    border="round"
                    max
                    padding="24"
                >
                    <VStack
                        max
                        gap="16"
                    >
                        <AvatarWithUsername
                            src={forum?.user?.avatar}
                            username={forum?.user?.username}
                            onClick={onNavigate}
                            size={24}
                            className={cls.pointer}
                        />
                        <Text text={formatDate(forum?.createdAt)} />
                        <Text text={forum?.category} />
                    </VStack>
                </Card>
            </VStack>
        );
    },
);
