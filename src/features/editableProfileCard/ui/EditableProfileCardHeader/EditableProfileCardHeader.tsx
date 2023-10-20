import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/ProfileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import {
    getRouteArticleCreate,
    getRouteChat,
    getRouteForumCreate,
    getRouteJobCreate,
} from '@/shared/const/router';
import { Tooltip } from '@/shared/ui/redesigned/Tooltip';
import { Icon } from '@/shared/ui/redesigned/Icon';
import BlockIcon from '@/shared/assets/icons/block.svg';
import UnBlockIcon from '@/shared/assets/icons/unblock.svg';
import { Dropdown, DropdownItem } from '@/shared/ui/redesigned/Popups';
import PlusIcon from '@/shared/assets/icons/create.svg';

interface EditableProfileCardHeaderProps {
    className?: string;
    onFollowClick?: () => void;
    onBlockUser?: () => void;
    isBlocked?: boolean;
    userIsFollowing?: boolean;
    isLoading?: boolean;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const {
            className,
            onFollowClick,
            userIsFollowing,
            isLoading,
            onBlockUser,
            isBlocked,
        } = props;
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

        const onFollow = useCallback(() => {
            onFollowClick?.();
        }, [onFollowClick]);

        const onBlock = useCallback(() => {
            onBlockUser?.();
        }, [onBlockUser]);

        const items = useMemo<DropdownItem[]>(
            () => [
                {
                    content: t('Створити статтю'),
                    onClick: () => navigate(getRouteArticleCreate()),
                },
                {
                    content: t('Створити вакансію'),
                    onClick: () => navigate(getRouteJobCreate()),
                },
                {
                    content: t('Створити форум'),
                    onClick: () => navigate(getRouteForumCreate()),
                },
            ],
            [navigate, t],
        );

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
                    {isLoading ? (
                        <Text text={t('Зачекайте будь-ласка...')} />
                    ) : (
                        authData?.id === profileData?.id && (
                            <Dropdown
                                items={items}
                                trigger={
                                    <Tooltip title={t('Створити')}>
                                        <Icon svg={PlusIcon} />
                                    </Tooltip>
                                }
                            />
                        )
                    )}
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
                            {!isBlocked && (
                                <>
                                    <Button
                                        onClick={onNavigateToChat}
                                        variant="filled"
                                    >
                                        {t('Написати')}
                                    </Button>
                                    <Button
                                        onClick={onFollow}
                                        color={
                                            userIsFollowing ? 'error' : 'normal'
                                        }
                                    >
                                        {t(
                                            userIsFollowing
                                                ? 'Відписатися'
                                                : 'Підписатися',
                                        )}
                                    </Button>
                                </>
                            )}
                            <Tooltip
                                title={t(
                                    isBlocked ? 'Розблокувати' : 'Заблокувати',
                                )}
                                direction="bottom left"
                            >
                                <Icon
                                    svg={isBlocked ? UnBlockIcon : BlockIcon}
                                    clickable
                                    onClick={onBlock}
                                />
                            </Tooltip>
                        </HStack>
                    )}
                </HStack>
            </Card>
        );
    },
);
