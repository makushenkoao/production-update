import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateInteractiveProps } from '../CreateInteractivePage';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

export const CreateTask = memo((props: CreateInteractiveProps) => {
    const { updateField, interactive, onSubmit } = props;
    const { t } = useTranslation();
    // FormEvent<HTMLFormElement>
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
                        text={t('Створити завдання')}
                        bold
                    />
                    <Input
                        placeholder={t('Введіть завдання')}
                        value={interactive.task.content}
                        onChange={(v) => updateField('task', { content: v })}
                    />
                    <HStack
                        max
                        justify="end"
                    >
                        <Button type="submit">{t('Створити завдання')}</Button>
                    </HStack>
                </VStack>
            </form>
        </Card>
    );
});
