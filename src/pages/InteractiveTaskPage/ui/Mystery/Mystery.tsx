import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Mystery as IMystery } from '../../model/types/interactive';
import { Modal } from '@/shared/ui/redesigned/Modal';

interface MysteryProps {
    mysteries?: IMystery[];
}

export const Mystery = (props: MysteryProps) => {
    const { mysteries } = props;
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
    const [currentMysteryIndex, setCurrentMysteryIndex] = useState(0);

    useEffect(() => {
        if (mysteries && mysteries.length > 0) {
            const interval = setInterval(() => {
                const randomIndex = Math.floor(
                    Math.random() * mysteries.length,
                );
                setCurrentMysteryIndex(randomIndex);
            }, 24 * 60 * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [mysteries]);

    const onClick = useCallback(() => {
        if (
            answer.toLowerCase() ===
            mysteries?.[currentMysteryIndex].answer.toLowerCase()
        ) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setAnswer('');
    }, [answer, currentMysteryIndex, mysteries]);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onChange = useCallback((v: string) => {
        setAnswer(v);
    }, []);

    return (
        <VStack
            max
            gap="16"
        >
            <Text
                title={t('Загадка дня')}
                text={t(`${mysteries?.[currentMysteryIndex].question}`)}
            />
            <HStack
                max
                gap="8"
            >
                <Input
                    onChange={onChange}
                    placeholder={t('Введіть відповідь')}
                />
                <Button onClick={onClick}>{t('Відповісти')}</Button>
            </HStack>
            <Button
                fullWidth
                variant="filled"
                onClick={onOpen}
            >
                {t('Подивитися відповідь')}
            </Button>
            <HStack
                justify="center"
                max
            >
                {isCorrect && (
                    <Text
                        variant="success"
                        text={t('Вірно! Молодець!')}
                        size="l"
                    />
                )}
                {isCorrect === false && (
                    <Text
                        variant="error"
                        text={t('Невірно! Спробуйте ще раз')}
                        size="l"
                    />
                )}
            </HStack>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <Text
                    text={t(
                        `Відповідь: ${mysteries?.[currentMysteryIndex].answer}`,
                    )}
                />
            </Modal>
        </VStack>
    );
};
