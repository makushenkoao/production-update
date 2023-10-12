import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { useGetArticlesQuery } from '@/entities/Article';
import { getRouteArticleDetails } from '@/shared/const/router';

export const RandomArticle = () => {
    const { t } = useTranslation();
    const { data } = useGetArticlesQuery();
    const navigate = useNavigate();

    const handleGetRandomArticle = useCallback(() => {
        if (data && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomArticleData = data[randomIndex];
            navigate(getRouteArticleDetails(randomArticleData.id));
        }
    }, [data, navigate]);

    return (
        <VStack
            max
            gap="16"
            align="center"
        >
            <Text title={t('Випадкова стаття')} />
            <Button onClick={handleGetRandomArticle}>
                {t('Отримати випадкову статтю')}
            </Button>
        </VStack>
    );
};
