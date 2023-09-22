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

interface ArticleAdditionalInfoProps {
    className?: string;
    author: User;
    createdAt: number;
    views: number;
    onEdit: () => void;
    onDelete: () => void;
}

export const ArticleAdditionalInfo = memo(
    (props: ArticleAdditionalInfoProps) => {
        const { className, author, createdAt, views, onEdit, onDelete } = props;
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
                <Text text={t('{{count}} переглядів', { count: views })} />

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
                            <Button onClick={onDelete} color="error">{t('Так')}</Button>
                        </HStack>
                    </VStack>
                </Modal>
            </VStack>
        );
    },
);
