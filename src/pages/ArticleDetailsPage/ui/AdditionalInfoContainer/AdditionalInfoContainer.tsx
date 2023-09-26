import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { deleteArticle, getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { useGetProfileDataQuery } from '@/entities/Profile';
import { saveArticle } from '@/pages/SavedArticlesPage';
import cls from './AdditionalInfoContainer.module.scss';

export const AdditionalInfoContainer = memo(() => {
    const article = useSelector(getArticleDetailsData);
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const navigate = useNavigate();
    const {
        data: profile,
        refetch,
        isLoading: isProfileLoading,
    } = useGetProfileDataQuery(authData?.id);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsSaved(Boolean(profile?.saved?.includes(article?.id || '')));
    }, [article?.id, profile?.saved]);

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

    const onSave = useCallback(() => {
        setIsLoading(true);
        dispatch(
            saveArticle({
                article,
                profile,
            }),
        )
            .then(() => {
                refetch();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [article, dispatch, profile, refetch]);

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
                onSave={onSave}
                isSaved={isSaved}
                isProfileLoading={isProfileLoading}
                isLoading={isLoading}
            />
        </Card>
    );
});
