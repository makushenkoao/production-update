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
}

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
            ingredients: [''],
            instruction: [''],
        },
        task: '',
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
            />
            <CreateMystery
                interactive={interactive}
                updateField={updateField}
            />
            <CreateFact
                interactive={interactive}
                updateField={updateField}
            />
            <CreateQuote
                interactive={interactive}
                updateField={updateField}
            />
            <CreateTask
                interactive={interactive}
                updateField={updateField}
            />
            <CreateAdvice
                interactive={interactive}
                updateField={updateField}
            />
            <CreateRecipe
                interactive={interactive}
                updateField={updateField}
            />
        </VStack>
    );
};

export default memo(CreateInteractivePage);
