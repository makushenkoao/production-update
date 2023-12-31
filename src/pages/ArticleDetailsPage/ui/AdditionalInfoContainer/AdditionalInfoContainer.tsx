import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { archiveArticle } from '../../model/services/archiveArticle/archiveArticle';
import cls from './AdditionalInfoContainer.module.scss';

import { deleteArticle, getArticleDetailsData } from '@/entities/Article';
import { useGetProfileDataQuery } from '@/entities/Profile';
import { getUserAuthData } from '@/entities/User';
import { saveArticle } from '@/pages/SavedArticlesPage';
import {
    getRouteArchiveArticles,
    getRouteArticleEdit,
    getRouteArticles,
} from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

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

    const onArchive = useCallback(() => {
        setIsLoading(true);
        dispatch(archiveArticle(profile))
            .then(() => {
                refetch();
            })
            .finally(() => {
                setIsLoading(false);
                navigate(getRouteArchiveArticles(authData?.id || ''));
            });
    }, [authData?.id, dispatch, navigate, profile, refetch]);

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
                onArchive={onArchive}
            />
        </Card>
    );
});
