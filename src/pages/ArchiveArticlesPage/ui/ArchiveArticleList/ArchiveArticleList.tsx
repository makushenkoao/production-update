import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getUserAuthData } from '@/entities/User';
import { useGetProfileDataQuery } from '@/entities/Profile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Article } from '@/entities/Article';
import { unArchiveArticle } from '../../model/services/unArchiveArticle';
import { getRouteArticleDetails } from '@/shared/const/router';
import { ArchiveArticlesLoading } from '../ArchiveArticlesLoading/ArchiveArticlesLoading';
import { ArchiveArticleItem } from '../ArchiveArticleItem/ArchiveArticleItem';

export const ArchiveArticleList = memo(() => {
    const [loading, setLoading] = useState(true);
    const authData = useSelector(getUserAuthData);
    const {
        data: profile,
        refetch,
        isLoading,
    } = useGetProfileDataQuery(authData?.id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, []);

    const onUnArchiveArticle = useCallback(
        (article: Article) => {
            setLoading(true);
            dispatch(
                unArchiveArticle({
                    profile,
                    article,
                }),
            ).finally(() => {
                setLoading(false);
                navigate(getRouteArticleDetails(article.id));
                refetch();
            });
        },
        [dispatch, navigate, profile, refetch],
    );

    if (loading || isLoading) {
        return <ArchiveArticlesLoading />;
    }

    return (
        <HStack
            gap="16"
            max
            wrap="wrap"
        >
            {profile?.archive?.map((article) => (
                <ArchiveArticleItem
                    key={article.id}
                    article={article}
                    onUnArchiveArticle={onUnArchiveArticle}
                />
            ))}
        </HStack>
    );
});
