import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getRouteArticleDetails } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Article, updateArticleDetails } from '@/entities/Article';
import { createArticle } from '../../model/services/createArticle';

interface ArticleCreateUpdateButtonProps {
    article: Article;
    type: 'create' | 'edit';
}

export const ArticleCreateUpdateButton = memo(
    (props: ArticleCreateUpdateButtonProps) => {
        const { article, type } = props;
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const navigate = useNavigate();
        const onSaveClick = () => {
            dispatch(updateArticleDetails(article)).then(() => {
                navigate(getRouteArticleDetails(article.id));
            });
        };

        const onPostArticle = () => {
            dispatch(createArticle(article)).then(() => {
                navigate(getRouteArticleDetails(article.id));
            });
        };

        return (
            <HStack
                justify="end"
                max
            >
                <Button
                    onClick={type === 'create' ? onPostArticle : onSaveClick}
                >
                    {type === 'create'
                        ? t('Створити статтю')
                        : t('Зберегти зміни')}
                </Button>
            </HStack>
        );
    },
);
