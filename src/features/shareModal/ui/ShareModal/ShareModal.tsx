import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ShareModel.module.scss';

import { User } from '@/entities/User';
import { useSearchUsersQuery } from '@/pages/SearchPage';
import ShareIcon from '@/shared/assets/icons/share.svg';
import { getRouteProfile } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { AvatarWithUsername } from '@/shared/ui/redesigned/AvatarWithUsername';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Tooltip } from '@/shared/ui/redesigned/Tooltip';

interface ShareModalProps {
    title: string;
    isOpen?: boolean;
    onClose?: () => void;
    onShare: (user: User) => void;
}

export const ShareModal = (props: ShareModalProps) => {
    const { isOpen, title, onShare, onClose } = props;
    const { t } = useTranslation();
    const [search, setSearch] = useState<string>('');

    const onChange = useCallback((value: string) => {
        setSearch(value);
    }, []);

    const { data, isLoading, error } = useSearchUsersQuery(
        {
            q: search,
        },
        {
            skip: !search,
        },
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={cls.modal}
        >
            <VStack
                max
                gap="16"
            >
                <Text title={title} />
                <Input
                    className={cls.input}
                    placeholder={t("Введіть Ім'я користувача")}
                    onChange={onChange}
                    value={search}
                />
                <VStack
                    max
                    gap="8"
                    className={cls.list}
                >
                    {isLoading &&
                        [1, 2, 3].map((item) => (
                            <Card
                                key={item}
                                max
                                padding="16"
                            >
                                <HStack
                                    max
                                    justify="between"
                                >
                                    <HStack gap="4">
                                        <Skeleton
                                            width={32}
                                            height={32}
                                            borderRadius="50%"
                                        />
                                        <Skeleton
                                            width={150}
                                            height={20}
                                        />
                                    </HStack>
                                    <Skeleton
                                        width={32}
                                        height={32}
                                        borderRadius="50%"
                                    />
                                </HStack>
                            </Card>
                        ))}
                    {data && data.length > 0 ? (
                        data?.map((item) => (
                            <Card
                                key={item.id}
                                padding="16"
                                max
                            >
                                <HStack
                                    max
                                    justify="between"
                                >
                                    <AppLink to={getRouteProfile(item.id)}>
                                        <AvatarWithUsername
                                            src={item.avatar}
                                            username={item.username}
                                            size={32}
                                        />
                                    </AppLink>
                                    <Tooltip
                                        title={t('Поділитися')}
                                        direction="bottom left"
                                    >
                                        <Icon
                                            svg={ShareIcon}
                                            width={20}
                                            height={20}
                                            className={cls.icon}
                                            clickable
                                            onClick={() => onShare(item)}
                                        />
                                    </Tooltip>
                                </HStack>
                            </Card>
                        ))
                    ) : (
                        <Text text={t("Введіть правильне ім'я користувача")} />
                    )}
                </VStack>
            </VStack>
        </Modal>
    );
};
