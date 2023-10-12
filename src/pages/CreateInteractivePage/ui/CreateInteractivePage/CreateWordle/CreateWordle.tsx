import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateInteractiveProps } from '../CreateInteractivePage';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

export const CreateWordle = memo((props: CreateInteractiveProps) => {
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
                        text={t('Створити wordle')}
                        bold
                    />
                    <Input
                        placeholder={t('Введіть слово')}
                        value={interactive.wordle.word}
                        onChange={(v) =>
                            updateField('wordle', {
                                ...interactive.wordle,
                                word: v,
                            })
                        }
                    />
                    <HStack
                        max
                        justify="end"
                    >
                        <Button type="submit">{t('Створити wordle')}</Button>
                    </HStack>
                </VStack>
            </form>
        </Card>
    );
});
