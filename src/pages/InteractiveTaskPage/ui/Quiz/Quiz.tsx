import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Quiz as IQuiz } from '../../model/types/interactive';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { useInteractive } from '@/shared/lib/hooks/useInteractive/useInteractive';

interface QuizProps {
    quizzes?: IQuiz[];
}

export const Quiz = (props: QuizProps) => {
    const { quizzes } = props;
    const { t } = useTranslation();
    const {
        isOpen,
        isCorrect,
        onClick,
        onOpen,
        onClose,
        onChange,
        currentIndex,
    } = useInteractive(quizzes);

    return (
        <VStack
            max
            gap="16"
        >
            <Text
                title={t('Вікторина дня')}
                text={t(`${quizzes?.[currentIndex].question}`)}
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
                    text={t(`Відповідь: ${quizzes?.[currentIndex].answer}`)}
                />
            </Modal>
        </VStack>
    );
};
