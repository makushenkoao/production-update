import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { CreateInteractiveProps } from '../CreateInteractivePage';

export const CreateQuote = memo((props: CreateInteractiveProps) => {
    const { updateField, interactive, onCreate } = props;
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
                    text={t('Створити цитата')}
                    bold
                />
                <Input
                    placeholder={t('Введіть цитату')}
                    value={interactive.quote.text}
                    onChange={(v) =>
                        updateField('quote', {
                            ...interactive.quote,
                            text: v,
                        })
                    }
                />
                <Input
                    placeholder={t('Введіть автора цитати')}
                    value={interactive.quote.author}
                    onChange={(v) =>
                        updateField('quote', {
                            ...interactive.quote,
                            author: v,
                        })
                    }
                />
                <HStack
                    max
                    justify="end"
                    onClick={onCreate}
                >
                    <Button>{t('Створити цитату')}</Button>
                </HStack>
            </VStack>
        </Card>
    );
});
