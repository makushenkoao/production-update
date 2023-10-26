import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { InteractiveTaskPageSkeleton } from '../InteractiveTaskPageSkeleton';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { useInteractive } from '@/shared/lib/hooks/useInteractive/useInteractive';
import { useGetQuizzesQuery } from '@/entities/Interactive';

export const Quiz = memo(() => {
    const { data, isLoading } = useGetQuizzesQuery();
    const { t } = useTranslation();
    const {
        isOpen,
        isCorrect,
        onSubmit,
        onOpen,
        onClose,
        onChange,
        currentIndex,
    } = useInteractive(data);

    if (isLoading) {
        return <InteractiveTaskPageSkeleton />;
    }

    return (
        <form onSubmit={onSubmit}>
            <VStack
                max
                gap="16"
            >
                <Text
                    title={t('Вікторина')}
                    text={t(`${data?.[currentIndex].question}`)}
                />
                <HStack
                    max
                    gap="8"
                >
                    <Input
                        onChange={onChange}
                        placeholder={t('Введіть відповідь')}
                    />
                    <Button type="submit">{t('Відповісти')}</Button>
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
                        text={t(`Відповідь: ${data?.[currentIndex].answer}`)}
                    />
                </Modal>
            </VStack>
        </form>
    );
});
