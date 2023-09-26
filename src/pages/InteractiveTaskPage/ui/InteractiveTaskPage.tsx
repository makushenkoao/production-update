import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { getRouteInteractive } from '@/shared/const/router';
import { Interactive } from '@/shared/const/Interactive';
import { Quiz } from './Quiz/Quiz';
import { Task } from './Task/Task';
import { Recipe } from './Recipe/Recipe';
import { Quote } from './Quote/Quote';
import { Advice } from './Advice/Advice';
import { Mystery } from './Mystery/Mystery';
import { RandomArticle } from './RandomArticle/RandomArticle';
import { Fact } from './Fact/Fact';
import cls from './InteractiveTaskPage.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { useGetInteractiveFactsQuery } from '../api/interactiveApi';
import { InteractiveTaskPageSkeleton } from './InteractiveTaskPageSkeleton';

const InteractiveTaskPage = () => {
    const { t } = useTranslation();
    const { task } = useParams<{ task: Interactive }>();
    const { data, isLoading } = useGetInteractiveFactsQuery();
    const navigate = useNavigate();

    const onBackToInteractive = useCallback(() => {
        navigate(getRouteInteractive());
    }, [navigate]);

    const getContent = (task?: Interactive) => {
        switch (task) {
            case Interactive.QUIZ:
                return <Quiz />;
            case Interactive.TASK:
                return <Task tasks={data?.tasks} />;
            case Interactive.RECIPE:
                return <Recipe recipes={data?.recipes} />;
            case Interactive.QUOTE:
                return <Quote quotes={data?.quotes} />;
            case Interactive.ADVICE:
                return <Advice advices={data?.advices} />;
            case Interactive.MYSTERY:
                return <Mystery />;
            case Interactive.RANDOM_ARTICLE:
                return <RandomArticle />;
            case Interactive.FACT:
                return <Fact facts={data?.facts} />;
            default:
                return <RandomArticle />;
        }
    };

    if (isLoading) {
        return <InteractiveTaskPageSkeleton />;
    }

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
