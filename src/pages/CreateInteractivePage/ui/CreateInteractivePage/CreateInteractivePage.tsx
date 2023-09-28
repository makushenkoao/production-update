import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    Advice,
    Mystery,
    Quiz,
    Quote,
    Recipe,
} from '@/pages/InteractiveTaskPage';
import { Card } from '@/shared/ui/redesigned/Card';
import { getRouteAdmin } from '@/shared/const/router';

interface InteractiveState {
    task: string;
    quote: Quote;
    advice: Advice;
    fact: string;
    recipe: Recipe;
    quiz: Quiz;
    mystery: Mystery;
}

type InteractiveType = string | Quote | Advice | Recipe | Quiz | Mystery;

type FieldNameType =
    | 'quiz'
    | 'fact'
    | 'task'
    | 'quote'
    | 'mystery'
    | 'advice'
    | 'recipe';

const CreateInteractivePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [interactive, setInteractive] = useState<InteractiveState>({
        advice: {
            title: '',
            description: '',
        },
        fact: '',
        mystery: {
            question: '',
            answer: '',
        },
        quiz: {
            question: '',
            answer: '',
        },
        quote: {
            text: '',
            author: '',
        },
        recipe: {
            title: '',
            ingredients: [],
            instruction: [],
        },
        task: '',
    });

    const updateField = (
        fieldName: FieldNameType,
        newValue: InteractiveType,
    ) => {
        setInteractive((prevState) => ({
            ...prevState,
            [fieldName]: newValue,
        }));
    };

    const onNavigateToAdminPanel = useCallback(() => {
        navigate(getRouteAdmin());
    }, [navigate]);

    return (
        <VStack
            max
            gap="16"
        >
            <Button
                onClick={onNavigateToAdminPanel}
                variant="filled"
            >
                {t('Повернутися до адмін панелі')}
            </Button>
            <Text title={t('Інтерактив')} />
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
                        <Button>{t('Створити вікторину')}</Button>
                    </HStack>
                </VStack>
            </Card>
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
                        text={t('Створити факт')}
                        bold
                    />
                    <Input
                        placeholder={t('Введіть факт')}
                        value={interactive.fact}
                        onChange={(v) => updateField('fact', v)}
                    />
                    <HStack
                        max
                        justify="end"
                    >
                        <Button>{t('Створити факт')}</Button>
                    </HStack>
                </VStack>
            </Card>
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
                    >
                        <Button>{t('Створити цитату')}</Button>
                    </HStack>
                </VStack>
            </Card>
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
                        <Button>{t('Створити пораду')}</Button>
                    </HStack>
                </VStack>
            </Card>
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
                    <HStack gap="8">
                        <Button variant="filled">
                            {t('Додати поле інгредієнта')}
                        </Button>
                        <Button variant="filled">
                            {t('Додати поле інструкції')}
                        </Button>
                    </HStack>
                    <HStack
                        max
                        justify="end"
                    >
                        <Button>{t('Створити рецепт')}</Button>
                    </HStack>
                </VStack>
            </Card>
        </VStack>
    );
};

export default memo(CreateInteractivePage);
