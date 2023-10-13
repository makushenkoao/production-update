import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/redesigned/Button';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ShareModalProps {
    title: string;
    isOpen?: boolean;
    onClose?: () => void;
    onDelete: () => void;
}

export const DeleteModal = (props: ShareModalProps) => {
    const { isOpen, title, onDelete, onClose } = props;
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
                <Text title={title} />
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
    );
};
