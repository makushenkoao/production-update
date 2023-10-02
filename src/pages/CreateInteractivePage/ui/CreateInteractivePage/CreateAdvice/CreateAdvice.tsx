import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { CreateInteractiveProps } from '../CreateInteractivePage';

export const CreateAdvice = memo((props: CreateInteractiveProps) => {
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
                        text={t('Створити порада')}
                        bold
                    />
                    <Input
                        placeholder={t('Введіть заголовок поради')}
                        value={interactive.advice.title}
                        onChange={(v) =>
                            updateField('advice', {
                                ...interactive.advice,
                                title: v,
                            })
                        }
                    />
                    <Input
                        placeholder={t('Введіть пораду')}
                        value={interactive.advice.description}
                        onChange={(v) =>
                            updateField('advice', {
                                ...interactive.advice,
                                description: v,
                            })
                        }
                    />
                    <HStack
                        max
                        justify="end"
                    >
                        <Button type="submit">{t('Створити пораду')}</Button>
                    </HStack>
                </VStack>
            </form>
        </Card>
    );
});