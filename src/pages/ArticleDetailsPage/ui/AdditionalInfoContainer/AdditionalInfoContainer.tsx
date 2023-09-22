import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getArticleDetailsData, deleteArticle } from '@/entities/Article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AdditionalInfoContainer.module.scss';

export const AdditionalInfoContainer = memo(() => {
    const article = useSelector(getArticleDetailsData);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [article, navigate]);

    const onDelete = useCallback(() => {
        if (article) {
            dispatch(deleteArticle(article.id));
            navigate(getRouteArticles());
        }
    }, [article, dispatch, navigate]);

    if (!article) {
        return null;
    }

    return (
        <Card
            padding="24"
            border="round"
            className={cls.card}
        >
            <ArticleAdditionalInfo
                onEdit={onEditArticle}
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
                onDelete={onDelete}
            />
        </Card>
    );
});
