import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Drawer } from '@/shared/ui/redesigned/Drawer';

export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { isArticlesPageWasOpened } = useJsonSettings();

    useEffect(() => {
        if (!isArticlesPageWasOpened) {
            setIsOpen(true);
            dispatch(
                saveJsonSettings({
                    isArticlesPageWasOpened: true,
                }),
            );
        }
    }, [dispatch, isArticlesPageWasOpened]);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const content = (
        <VStack
            max
            gap="16"
            align="normal"
        >
            <Text
                title={t('Ласкаво просимо на сторінку статей')}
                text={t('Ви можете знайти та переглядати статті на різні теми')}
            />
            {!isMobile && (
                <HStack justify="end">
                    <Button
                        onClick={onClose}
                    >
                        {t('Закрити')}
                    </Button>
                </HStack>
            )}
        </VStack>
    );

    if (isMobile) {
        return (
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                lazy
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            {content}
        </Modal>
    );
});
