import { useTranslation } from 'react-i18next';

import { Profile } from '../../../model/types/profile';
import cls from '../ProfileCardRedesigned/ProfileCardRedesigned.module.scss';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { AvatarWithUsername } from '@/shared/ui/redesigned/AvatarWithUsername';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/redesigned/Text';


interface FollowersAndFollowingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
    loading: boolean;
    data?: Profile[] | string;
    type?: 'followers' | 'followings';
}

export const FollowersAndFollowingsModal = (
    props: FollowersAndFollowingsModalProps,
) => {
    const { isOpen, onClose, loading, type, data } = props;
    const { t } = useTranslation();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <VStack
                max
                gap="16"
            >
                {loading ? (
                    <Skeleton
                        width={200}
                        height={40}
                    />
                ) : (
                    <Text
                        title={
                            type === 'followers' ? 'Читачі' : 'Відстежуються'
                        }
                        text={!data?.length ? t('Пусто') : ''}
                        className={cls.type}
                    />
                )}
                <VStack
                    max
                    gap="8"
                    style={{
                        width: 400,
                        maxHeight: 400,
                        overflowY: 'auto',
                    }}
                >
                    {loading ? (
                        <>
                            {[1, 2, 3].map((_) => (
                                <Card
                                    max
                                    key={_}
                                    padding="16"
                                >
                                    <HStack gap="8">
                                        <Skeleton
                                            width={35}
                                            height={35}
                                            borderRadius="50%"
                                        />
                                        <Skeleton
                                            width={150}
                                            height={25}
                                        />
                                    </HStack>
                                </Card>
                            ))}
                        </>
                    ) : (
                        <>
                            {Array.isArray(data) &&
                                data?.map((item: Profile) => (
                                    <AppLink
                                        key={item.id}
                                        max
                                        to={getRouteProfile(item.id || '')}
                                        target="_blank"
                                        className={cls.pointer}
                                    >
                                        <Card
                                            max
                                            padding="16"
                                        >
                                            <AvatarWithUsername
                                                username={item.username}
                                                src={item.avatar}
                                                size={35}
                                            />
                                        </Card>
                                    </AppLink>
                                ))}
                        </>
                    )}
                </VStack>
            </VStack>
        </Modal>
    );
};
