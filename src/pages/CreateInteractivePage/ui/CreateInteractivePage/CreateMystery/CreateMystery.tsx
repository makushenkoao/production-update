import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { CreateInteractiveProps } from '../CreateInteractivePage';

export const CreateMystery = memo((props: CreateInteractiveProps) => {
    const { updateField, interactive } = props;
    const { t } = useTranslation();

    return (
        <Card
            max
            padding="24"
            border="partial"
        >
            <VStack
                max
                gap="16"
            >
                <Text
                    text={t('Створити загадка')}
                    bold
                />
                <Input
                    placeholder={t('Введіть загадку')}
                    value={interactive.mystery.question}
                    onChange={(v) =>
                        updateField('mystery', {
                            ...interactive.mystery,
                            question: v,
                        })
                    }
                />
                <Input
                    placeholder={t('Введіть відповідь до загадки')}
                    value={interactive.mystery.answer}
                    onChange={(v) =>
                        updateField('mystery', {
                            ...interactive.mystery,
                            answer: v,
                        })
                    }
                />
                <HStack
                    max
                    justify="end"
                >
                    <Button>{t('Створити загадку')}</Button>
                </HStack>
            </VStack>
        </Card>
    );
});
