import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { CreateInteractiveProps } from '../CreateInteractivePage';

export const CreateQuiz = memo((props: CreateInteractiveProps) => {
    const { updateField, interactive, onSubmit } = props;
    const { t } = useTranslation();

    return (
        <Card
            max
            padding="24"
            border="partial"
        >
            <form onSubmit={onSubmit}>
                <VStack
                    max
                    gap="16"
                >
                    <Text
                        text={t('Створити вікторину')}
                        bold
                    />
                    <Input
                        placeholder={t('Введіть питання')}
                        value={interactive.quiz.question}
                        onChange={(v) =>
                            updateField('quiz', {
                                ...interactive.quiz,
                                question: v,
                            })
                        }
                    />
                    <Input
                        placeholder={t('Введіть відповідь до питання')}
                        value={interactive.quiz.answer}
                        onChange={(v) =>
                            updateField('quiz', {
                                ...interactive.quiz,
                                answer: v,
                            })
                        }
                    />
                    <HStack
                        max
                        justify="end"
                    >
                        <Button type="submit">{t('Створити вікторину')}</Button>
                    </HStack>
                </VStack>
            </form>
        </Card>
    );
});
