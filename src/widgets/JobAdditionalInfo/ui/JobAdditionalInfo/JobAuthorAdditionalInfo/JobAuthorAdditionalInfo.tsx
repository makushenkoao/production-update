import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from '../JobAdditionalInfo.module.scss';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/redesigned/Text';

interface JobAuthorAdditionalInfoProps {
    onDelete: () => void;
    onEdit: () => void;
}

export const JobAuthorAdditionalInfo = memo(
    (props: JobAuthorAdditionalInfoProps) => {
        const { onDelete, onEdit } = props;
        const { t } = useTranslation();
        const [isOpen, setIsOpen] = useState(false);

        const onOpen = useCallback(() => {
            setIsOpen(true);
        }, []);

        const onClose = useCallback(() => {
            setIsOpen(false);
        }, []);

        return (
            <Card
                padding="24"
                border="round"
                className={cls.card}
            >
                <VStack
                    max
                    gap="16"
                >
                    <Button
                        onClick={onEdit}
                        fullWidth
                    >
                        {t('Редагувати')}
                    </Button>
                    <Button
                        fullWidth
                        variant="filled"
                        color="error"
                        onClick={onOpen}
                    >
                        {t('Видалити')}
                    </Button>
                </VStack>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <VStack
                        max
                        gap="16"
                    >
                        <Text
                            title={t(
                                'Ви впевнені, що хочете видалити вакансію?',
                            )}
                        />
                        <HStack
                            max
                            gap="8"
                            justify="end"
                        >
                            <Button onClick={onClose}>{t('Ні')}</Button>
                            <Button
                                variant="filled"
                                color="error"
                                onClick={onDelete}
                            >
                                {t('Так')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </Card>
        );
    },
);
