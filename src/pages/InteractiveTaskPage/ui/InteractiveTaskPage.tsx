import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { getRouteInteractive } from '@/shared/const/router';
import { Quiz } from './Quiz/Quiz';
import { Task } from './Task/Task';
import { Recipe } from './Recipe/Recipe';
import { Quote } from './Quote/Quote';
import { Advice } from './Advice/Advice';
import { Mystery } from './Mystery/Mystery';
import { RandomArticle } from './RandomArticle/RandomArticle';
import { Fact } from './Fact/Fact';
import { Card } from '@/shared/ui/redesigned/Card';
import { Wordle } from './Wordle/Wordle';
import cls from './InteractiveTaskPage.module.scss';
import { EInteractive } from '@/entities/Interactive';

const InteractiveTaskPage = () => {
    const { t } = useTranslation();
    const { task } = useParams<{ task: EInteractive }>();
    const navigate = useNavigate();

    const onBackToInteractive = useCallback(() => {
        navigate(getRouteInteractive());
    }, [navigate]);

    const getContent = (task?: EInteractive) => {
        switch (task) {
            case EInteractive.QUIZ:
                return <Quiz />;
            case EInteractive.TASK:
                return <Task />;
            case EInteractive.RECIPE:
                return <Recipe />;
            case EInteractive.QUOTE:
                return <Quote />;
            case EInteractive.ADVICE:
                return <Advice />;
            case EInteractive.MYSTERY:
                return <Mystery />;
            case EInteractive.RANDOM_ARTICLE:
                return <RandomArticle />;
            case EInteractive.WORDLE:
                return <Wordle />;
            case EInteractive.FACT:
                return <Fact />;
            default:
                navigate(getRouteInteractive());
        }
    };

    return (
        <Page className={cls.page}>
            <VStack
                max
                gap="16"
            >
                <Button
                    variant="filled"
                    onClick={onBackToInteractive}
                >
                    {t('Повернутися до списку')}
                </Button>
                <Card
                    padding="16"
                    className={cls.card}
                >
                    {getContent(task)}
                </Card>
            </VStack>
        </Page>
    );
};

export default InteractiveTaskPage;
