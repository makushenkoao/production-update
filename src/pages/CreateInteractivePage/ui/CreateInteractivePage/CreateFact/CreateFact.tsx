import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateInteractiveProps } from '../CreateInteractivePage';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

export const CreateFact = memo((props: CreateInteractiveProps) => {
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
                        text={t('Створити факт')}
                        bold
                    />
                    <Input
                        placeholder={t('Введіть факт')}
                        value={interactive.fact.content}
                        onChange={(v) => updateField('fact', { content: v })}
                    />
                    <HStack
                        max
                        justify="end"
                    >
                        <Button type="submit">{t('Створити факт')}</Button>
                    </HStack>
                </VStack>
            </form>
        </Card>
    );
});
