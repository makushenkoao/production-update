import React, {
    FormEvent,
    memo,
    MemoExoticComponent,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CreateQuiz } from './CreateQuiz/CreateQuiz';
import { CreateRecipe } from './CreateRecipe/CreateRecipe';
import { CreateMystery } from './CreateMystery/CreateMystery';
import { CreateFact } from './CreateFact/CreateFact';
import { CreateQuote } from './CreateQuote/CreateQuote';
import { CreateTask } from './CreateTask/CreateTask';
import { CreateAdvice } from './CreateAdvice/CreateAdvice';
import { CreateWordle } from './CreateWordle/CreateWordle';
import { CreateSudoku } from './CreateSudoku/CreateSudoku';

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
    usePostSudokuMutation,
    usePostTasksMutation,
    usePostWordleMutation,
} from '@/entities/Interactive';
import { getRouteAdmin } from '@/shared/const/router';
import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export interface CreateInteractiveProps {
    updateField: (
        fieldName: InteractiveFieldNameType,
        newValue: InteractiveType,
    ) => void;
    interactive: InteractiveState;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
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
    const [createWordle] = usePostWordleMutation();
    const [createSudoku] = usePostSudokuMutation();

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
        wordle: {
            word: '',
        },
        sudoku: {
            grid: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
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

    const onCreateAdvice = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            createAdvice({
                id: Date.now().toString(),
                ...interactive.advice,
            });
            updateField('advice', { title: '', description: '' });
        },
        [createAdvice, interactive.advice, updateField],
    );

    const onCreateFact = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            createFact({
                id: Date.now().toString(),
                ...interactive.fact,
            });
            updateField('fact', { content: '' });
        },
        [createFact, interactive.fact, updateField],
    );

    const onCreateMystery = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            createMystery({
                id: Date.now().toString(),
                ...interactive.mystery,
            });
            updateField('mystery', { question: '', answer: '' });
        },
        [createMystery, interactive.mystery, updateField],
    );

    const onCreateQuiz = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            createQuiz({
                id: Date.now().toString(),
                ...interactive.quiz,
            });
            updateField('quiz', { question: '', answer: '' });
        },
        [createQuiz, interactive.quiz, updateField],
    );

    const onCreateQuote = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            createQuote({
                id: Date.now().toString(),
                ...interactive.quote,
            });
            updateField('quote', { text: '', author: '' });
        },
        [createQuote, interactive.quote, updateField],
    );

    const onCreateRecipe = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            createRecipe({
                id: Date.now().toString(),
                ...interactive.recipe,
            });
            updateField('recipe', {
                title: '',
                ingredients: [''],
                instruction: [''],
            });
        },
        [createRecipe, interactive.recipe, updateField],
    );

    const onCreateTask = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            createTask({
                id: Date.now().toString(),
                ...interactive.task,
            });
            updateField('task', { content: '' });
        },
        [createTask, interactive.task, updateField],
    );

    const onCreateWordle = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            createWordle({
                id: Date.now().toString(),
                ...interactive.wordle,
            });
            updateField('wordle', { word: '' });
        },
        [createWordle, interactive.wordle, updateField],
    );

    const onCreateSudoku = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            createSudoku({
                id: Date.now().toString(),
                ...interactive.sudoku,
            });
            updateField('sudoku', {
                grid: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                ],
            });
        },
        [createSudoku, interactive.sudoku, updateField],
    );

    const components = useMemo<
        {
            component: MemoExoticComponent<
                (props: CreateInteractiveProps) => JSX.Element
            >;
            onSubmit: (e: FormEvent<HTMLFormElement>) => void;
        }[]
    >(
        () => [
            {
                component: CreateQuiz,
                onSubmit: onCreateQuiz,
            },
            {
                component: CreateMystery,
                onSubmit: onCreateMystery,
            },
            {
                component: CreateFact,
                onSubmit: onCreateFact,
            },
            {
                component: CreateQuote,
                onSubmit: onCreateQuote,
            },
            {
                component: CreateTask,
                onSubmit: onCreateTask,
            },
            {
                component: CreateAdvice,
                onSubmit: onCreateAdvice,
            },
            {
                component: CreateWordle,
                onSubmit: onCreateWordle,
            },
            {
                component: CreateRecipe,
                onSubmit: onCreateRecipe,
            },
            {
                component: CreateSudoku,
                onSubmit: onCreateSudoku,
            },
        ],
        [
            onCreateAdvice,
            onCreateFact,
            onCreateMystery,
            onCreateQuiz,
            onCreateQuote,
            onCreateRecipe,
            onCreateTask,
            onCreateWordle,
            onCreateSudoku,
        ],
    );

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
            {components.map(({ component: Component, onSubmit }, index) => (
                <React.Fragment key={index}>
                    <Component
                        onSubmit={onSubmit}
                        updateField={updateField}
                        interactive={interactive}
                    />
                </React.Fragment>
            ))}
        </VStack>
    );
};

export default memo(CreateInteractivePage);
