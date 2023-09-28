import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { CreateInteractiveProps } from '../CreateInteractivePage';

export const CreateTask = memo((props: CreateInteractiveProps) => {
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
                    text={t('Створити завдання')}
                    bold
                />
                <Input
                    placeholder={t('Введіть завдання')}
                    value={interactive.task}
                    onChange={(v) => updateField('task', v)}
                />
                <HStack
                    max
                    justify="end"
                >
                    <Button>{t('Створити завдання')}</Button>
                </HStack>
            </VStack>
        </Card>
    );
});
