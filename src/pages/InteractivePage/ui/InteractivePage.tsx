import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteInteractiveTask } from '@/shared/const/router';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './InteractivePage.module.scss';
import { Interactive } from '@/shared/const/Interactive';

const InteractivePage = () => {
    const { t } = useTranslation();

    const interactiveItems = useMemo<
        {
            title: string;
            href: Interactive;
            description: string;
        }[]
    >(
        () => [
            {
                title: t('Вікторина'),
                href: Interactive.QUIZ,
                description: t(
                    'Кожного дня вам дається питання на будь-яку тему, перевірте свої знання',
                ),
            },
            {
                title: t('Факт'),
                href: Interactive.FACT,
                description: t(
                    'Кожного дня вам дається цікавий факт про наше життя',
                ),
            },
            {
                title: t('Завдання'),
                href: Interactive.TASK,
                description: t(
                    'Кожного дня ми даємо завдання, яке ви повинні виконати',
                ),
            },
            {
                title: t('Цитата'),
                href: Interactive.QUOTE,
                description: t('Кожного дня ми даємо цитату'),
            },
            {
                title: t('Загадка'),
                href: Interactive.MYSTERY,
                description: t(
                    'Кожного дня ми даємо загадку, яка перевірить вашу логіку',
                ),
            },
            {
                title: t('Порада'),
                href: Interactive.ADVICE,
                description: t(
                    'Кожного дня даємо пораду для покращення вашого життя',
                ),
            },
            {
                title: t('Рецепт'),
                href: Interactive.RECIPE,
                description: t(
                    'Кожного дня ми даємо рецепт, який ви маєте приготувати',
                ),
            },
            {
                title: t('Wordle'),
                href: Interactive.WORDLE,
                description: t(
                    'Кожного дня ми даємо будь-яке слово, відгадайте його',
                ),
            },
            {
                title: t('Випадкова стаття'),
                href: Interactive.RANDOM_ARTICLE,
                description: t('Прочитайте абсолютно випадкову статтю'),
            },
        ],
        [t],
    );

    return (
        <Page>
            <VStack
                max
                gap="16"
            >
                <Text title={t('Інтерактив')} />
                <HStack
                    max
                    gap="16"
                    wrap="wrap"
                >
                    {interactiveItems.map(({ href, title, description }) => (
                        <AppLink
                            key={href}
                            to={getRouteInteractiveTask(href)}
                            className={cls.card}
                        >
                            <Card
                                max
                                padding="16"
                            >
                                <Text
                                    title={title}
                                    text={description}
                                    className={cls.text}
                                />
                            </Card>
                        </AppLink>
                    ))}
                </HStack>
            </VStack>
        </Page>
    );
};

export default InteractivePage;
