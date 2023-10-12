import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateInteractiveProps } from '../CreateInteractivePage';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

export const CreateRecipe = memo((props: CreateInteractiveProps) => {
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
                        text={t('Створити рецепт')}
                        bold
                    />
                    <Input
                        placeholder={t('Введіть назву страви')}
                        value={interactive.recipe.title}
                        onChange={(v) =>
                            updateField('recipe', {
                                ...interactive.recipe,
                                title: v,
                            })
                        }
                    />
                    {interactive.recipe.ingredients.map((ingredient, index) => (
                        <Input
                            key={index}
                            placeholder={t('Введіть інгредієнт')}
                            value={ingredient}
                            onChange={(v) =>
                                updateField('recipe', {
                                    ...interactive.recipe,
                                    ingredients:
                                        interactive.recipe.ingredients.map(
                                            (item, i) =>
                                                i === index ? v : item,
                                        ),
                                })
                            }
                        />
                    ))}
                    {interactive.recipe.instruction.map(
                        (instruction, index) => (
                            <Input
                                key={index}
                                placeholder={t('Введіть інструкцію')}
                                value={instruction}
                                onChange={(v) =>
                                    updateField('recipe', {
                                        ...interactive.recipe,
                                        instruction:
                                            interactive.recipe.instruction.map(
                                                (item, i) =>
                                                    i === index ? v : item,
                                            ),
                                    })
                                }
                            />
                        ),
                    )}
                    <HStack gap="8">
                        <Button
                            variant="filled"
                            onClick={() => {
                                updateField('recipe', {
                                    ...interactive.recipe,
                                    ingredients: [
                                        ...interactive.recipe.ingredients,
                                        '',
                                    ],
                                });
                            }}
                        >
                            {t('Додати поле інгредієнта')}
                        </Button>
                        <Button
                            variant="filled"
                            onClick={() => {
                                updateField('recipe', {
                                    ...interactive.recipe,
                                    instruction: [
                                        ...interactive.recipe.instruction,
                                        '',
                                    ],
                                });
                            }}
                        >
                            {t('Додати поле інструкції')}
                        </Button>
                    </HStack>
                    <HStack
                        max
                        justify="end"
                    >
                        <Button type="submit">{t('Створити рецепт')}</Button>
                    </HStack>
                </VStack>
            </form>
        </Card>
    );
});
