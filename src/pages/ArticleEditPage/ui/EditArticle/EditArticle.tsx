import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AddArticleBlocks } from '../AddArticleBlocks/AddArticleBlocks';
import { ArticleEditorHeader } from '../ArticleEditerHeader/ArticleEditerHeader';
import { ArticleBlocks } from '../ArticleBlocks/ArticleBlocks';
import { ArticleCreateUpdateButton } from '../ArticleCreateUpdateButton/ArticleCreateUpdateButton';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Article } from '@/entities/Article';
import { getRouteForbidden } from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';

interface EditArticleProps {
    data: Article;
}

export const EditArticle = memo((props: EditArticleProps) => {
    const { data } = props;
    const [article, setArticle] = useState<Article>(data);
    const navigate = useNavigate();
    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        if (data.user.id !== authData?.id) {
            navigate(getRouteForbidden());
        }
    }, [authData?.id, data.user.id, navigate]);

    return (
        <VStack
            gap="32"
            max
        >
            <ArticleEditorHeader
                article={article}
                setArticle={setArticle}
            />
            <ArticleBlocks
                blocks={article.blocks}
                setArticle={setArticle}
            />
            <AddArticleBlocks setArticle={setArticle} />
            <ArticleCreateUpdateButton
                article={article}
                type="edit"
            />
        </VStack>
    );
});
