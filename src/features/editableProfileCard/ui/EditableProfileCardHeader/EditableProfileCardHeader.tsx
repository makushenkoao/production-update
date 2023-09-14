import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/ProfileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { Card } from '@/shared/ui/redesigned/Card';
import { getRouteChat } from '@/shared/const/router';

interface EditableProfileCardHeaderProps {
    className?: string;
    onFollowClick?: () => void;
    userIsFollowing?: boolean;
    isLoading?: boolean;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className, onFollowClick, userIsFollowing, isLoading } = props;
        const { t } = useTranslation();
        const navigate = useNavigate();
        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);
        const canEdit = authData?.id === profileData?.id;
        const dispatch = useAppDispatch();
        const readonly = useSelector(getProfileReadonly);

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancel = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        const onNavigateToChat = useCallback(() => {
            if (profileData?.id) {
                navigate(getRouteChat(profileData?.id));
            }
        }, [navigate, profileData?.id]);

        const onFollowHandleClick = useCallback(() => {
            onFollowClick?.();
        }, [onFollowClick]);

        return (
            <Card
                padding="24"
                max
            >
                <HStack
                    justify="between"
                    max
                    className={classNames('', {}, [className])}
                >
                    <Text title={t('Профіль')} />
                    {isLoading && <Text text={t('Зачекайте будь-ласка...')} />}
                    {canEdit ? (
                        <HStack gap="8">
                            <Button
                                color={readonly ? 'normal' : 'error'}
                                onClick={readonly ? onEdit : onCancel}
                                data-testid={
                                    readonly
                                        ? 'EditableProfileCardHeader.EditButton'
                                        : 'EditableProfileCardHeader.CancelButton'
                                }
                            >
                                {t(readonly ? 'Редагувати' : 'Скасувати')}
                            </Button>
                            {!readonly && (
                                <Button
                                    color="success"
                                    onClick={onSave}
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                >
                                    {t('Зберегти')}
                                </Button>
                            )}
                        </HStack>
                    ) : (
                        <HStack gap="8">
                            <Button
                                onClick={onNavigateToChat}
                                variant="filled"
                            >
                                {t('Написати')}
                            </Button>
                            <Button
                                onClick={onFollowHandleClick}
                                color={userIsFollowing ? 'error' : 'normal'}
                            >
                                {t(
                                    userIsFollowing
                                        ? 'Відписатися'
                                        : 'Підписатися',
                                )}
                            </Button>
                        </HStack>
                    )}
                </HStack>
            </Card>
        );
    },
);
