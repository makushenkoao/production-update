import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';
import { getRouteProfile } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';

interface ArticleAdditionalInfoProps {
    className?: string;
    author: User;
    createdAt: number;
    views: number;
    onEdit: () => void;
}

export const ArticleAdditionalInfo = memo(
    (props: ArticleAdditionalInfoProps) => {
        const { className, author, createdAt, views, onEdit } = props;
        const { t } = useTranslation();

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
                <Button onClick={onEdit}>{t('Редагувати')}</Button>
                <Text text={t('{{count}} переглядів', { count: views })} />
            </VStack>
        );
    },
);
