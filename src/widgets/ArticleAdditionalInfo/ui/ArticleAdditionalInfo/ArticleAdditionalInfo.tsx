import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData, User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';
import { getRouteProfile } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Tooltip } from '@/shared/ui/redesigned/Tooltip';
import SaveIcon from '@/shared/assets/icons/save.svg';
import UnSaveIcon from '@/shared/assets/icons/unsave.svg';
import ArchiveIcon from '@/shared/assets/icons/archive.svg';
import cls from './ArticleAdditionalInfo.module.scss';

interface ArticleAdditionalInfoProps {
    className?: string;
    author: User;
    createdAt: number;
    views: number;
    onEdit: () => void;
    onDelete: () => void;
    onSave: () => void;
    isSaved?: boolean;
    onArchive: () => void;
    isProfileLoading?: boolean;
    isLoading?: boolean;
}

export const ArticleAdditionalInfo = memo(
    (props: ArticleAdditionalInfoProps) => {
        const {
            className,
            author,
            createdAt,
            views,
            onEdit,
            onDelete,
            onSave,
            isProfileLoading,
            isLoading,
            onArchive,
            isSaved,
        } = props;
        const { t } = useTranslation();
        const [isOpen, setIsOpen] = useState(false);
        const authData = useSelector(getUserAuthData);

        const onOpen = useCallback(() => {
            setIsOpen(true);
        }, []);

        const onClose = useCallback(() => {
            setIsOpen(false);
        }, []);

        return (
            <VStack
                gap="32"
                className={className}
            >
                <AppLink
                    to={getRouteProfile(author.id)}
                    target="_blank"
                >
                    <HStack gap="8">
                        <Avatar
                            src={author.avatar}
                            width={32}
                            height={32}
                        />
                        <Text
                            text={author.username}
                            bold
                        />
                        <Text text={formatDate(createdAt)} />
                    </HStack>
                </AppLink>
                {author.id === authData?.id && (
                    <VStack
                        max
                        gap="16"
                    >
                        <Button
                            fullWidth
                            onClick={onEdit}
                        >
                            {t('Редагувати')}
                        </Button>
                        <Button
                            variant="filled"
                            fullWidth
                            onClick={onOpen}
                        >
                            {t('Видалити')}
                        </Button>
                    </VStack>
                )}
                <HStack
                    max
                    justify="between"
                >
                    <Text text={t('{{count}} переглядів', { count: views })} />
                    <HStack gap="8">
                        <Button
                            variant="clear"
                            disabled={isLoading || isProfileLoading}
                        >
                            {isSaved ? (
                                <Tooltip
                                    title={t('Прибрати зі збережених')}
                                    direction="bottom left"
                                >
                                    <UnSaveIcon
                                        width={24}
                                        height={24}
                                        onClick={onSave}
                                        className={cls.icon}
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip
                                    title={t('Зберегти')}
                                    direction="bottom left"
                                >
                                    <SaveIcon
                                        width={20}
                                        height={20}
                                        onClick={onSave}
                                        className={cls.icon}
                                    />
                                </Tooltip>
                            )}
                        </Button>
                        <Button
                            variant="clear"
                            disabled={isLoading || isProfileLoading}
                        >
                            <Tooltip
                                title={t('Архівувати')}
                                direction="bottom left"
                            >
                                <ArchiveIcon
                                    width={20}
                                    height={20}
                                    onClick={onArchive}
                                    className={cls.icon}
                                />
                            </Tooltip>
                        </Button>
                    </HStack>
                </HStack>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <VStack
                        max
                        gap="16"
                    >
                        <Text title={t('Ви точно хочете видалити статтю?')} />
                        <HStack
                            max
                            gap="16"
                            justify="end"
                        >
                            <Button onClick={onClose}>{t('Ні')}</Button>
                            <Button
                                onClick={onDelete}
                                color="error"
                            >
                                {t('Так')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </VStack>
        );
    },
);
