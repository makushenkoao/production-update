import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { getRouteAdmin } from '@/shared/const/router';
import {
    InteractiveFieldNameType,
    InteractiveState,
    InteractiveType,
    usePostAdvicesMutation,
    usePostFactsMutation,
    usePostMysteriesMutation,
    usePostQuizzesMutation,
    usePostQuotesMutation,
    usePostRecipesMutation,
    usePostTasksMutation,
} from '@/entities/Interactive';
import { CreateQuiz } from './CreateQuiz/CreateQuiz';
import { CreateRecipe } from './CreateRecipe/CreateRecipe';
import { CreateMystery } from './CreateMystery/CreateMystery';
import { CreateFact } from './CreateFact/CreateFact';
import { CreateQuote } from './CreateQuote/CreateQuote';
import { CreateTask } from './CreateTask/CreateTask';
import { CreateAdvice } from './CreateAdvice/CreateAdvice';

export interface CreateInteractiveProps {
    updateField: (
        fieldName: InteractiveFieldNameType,
        newValue: InteractiveType,
    ) => void;
    interactive: InteractiveState;
    onCreate: () => void;
}

const CreateInteractivePage = () => {
    const { t } = useTranslation();
    const [createAdvice] = usePostAdvicesMutation();
    const [createFact] = usePostFactsMutation();
    const [createMystery] = usePostMysteriesMutation();
    const [createQuiz] = usePostQuizzesMutation();
    const [createQuote] = usePostQuotesMutation();
    const [createRecipe] = usePostRecipesMutation();
    const [createTask] = usePostTasksMutation();

    const navigate = useNavigate();

    const [interactive, setInteractive] = useState<InteractiveState>({
        advice: {
            title: '',
            description: '',
        },
        fact: {
            content: '',
        },
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
            ingredients: [''],
            instruction: [''],
        },
        task: {
            content: '',
        },
    });

    const updateField = useCallback(
        (fieldName: InteractiveFieldNameType, newValue: InteractiveType) => {
            setInteractive((prevState) => ({
                ...prevState,
                [fieldName]: newValue,
            }));
        },
        [],
    );

    const onNavigateToAdminPanel = useCallback(() => {
        navigate(getRouteAdmin());
    }, [navigate]);

    const onCreateAdvice = useCallback(() => {
        createAdvice({
            id: Date.now().toString(),
            ...interactive.advice,
        });
        updateField('advice', { title: '', description: '' });
    }, [createAdvice, interactive.advice, updateField]);

    const onCreateFact = useCallback(() => {
        createFact({
            id: Date.now().toString(),
            ...interactive.fact,
        });
        updateField('fact', { content: '' });
    }, [createFact, interactive.fact, updateField]);

    const onCreateMystery = useCallback(() => {
        createMystery({
            id: Date.now().toString(),
            ...interactive.mystery,
        });
        updateField('mystery', { question: '', answer: '' });
    }, [createMystery, interactive.mystery, updateField]);

    const onCreateQuiz = useCallback(() => {
        createQuiz({
            id: Date.now().toString(),
            ...interactive.quiz,
        });
        updateField('quiz', { question: '', answer: '' });
    }, [createQuiz, interactive.quiz, updateField]);

    const onCreateQuote = useCallback(() => {
        createQuote({
            id: Date.now().toString(),
            ...interactive.quote,
        });
        updateField('quote', { text: '', author: '' });
    }, [createQuote, interactive.quote, updateField]);

    const onCreateRecipe = useCallback(() => {
        createRecipe({
            id: Date.now().toString(),
            ...interactive.recipe,
        });
        updateField('recipe', {
            title: '',
            ingredients: [''],
            instruction: [''],
        });
    }, [createRecipe, interactive.recipe, updateField]);

    const onCreateTask = useCallback(() => {
        createTask({
            id: Date.now().toString(),
            ...interactive.task,
        });
        updateField('task', { content: '' });
    }, [createTask, interactive.task, updateField]);

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
            <CreateQuiz
                interactive={interactive}
                updateField={updateField}
                onCreate={onCreateQuiz}
            />
            <CreateMystery
                interactive={interactive}
                updateField={updateField}
                onCreate={onCreateMystery}
            />
            <CreateFact
                interactive={interactive}
                updateField={updateField}
                onCreate={onCreateFact}
            />
            <CreateQuote
                interactive={interactive}
                updateField={updateField}
                onCreate={onCreateQuote}
            />
            <CreateTask
                interactive={interactive}
                updateField={updateField}
                onCreate={onCreateTask}
            />
            <CreateAdvice
                interactive={interactive}
                updateField={updateField}
                onCreate={onCreateAdvice}
            />
            <CreateRecipe
                interactive={interactive}
                updateField={updateField}
                onCreate={onCreateRecipe}
            />
        </VStack>
    );
};

export default memo(CreateInteractivePage);
