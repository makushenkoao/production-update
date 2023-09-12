import React, { memo, useState } from 'react';
import { Article } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { AddArticleBlocks } from '../AddArticleBlocks/AddArticleBlocks';
import { ArticleEditorHeader } from '../ArticleEditerHeader/ArticleEditerHeader';
import { ArticleBlocks } from '../ArticleBlocks/ArticleBlocks';
import { ArticleCreateUpdateButton } from '../ArticleCreateUpdateButton/ArticleCreateUpdateButton';

interface EditArticleProps {
    data: Article;
}

export const EditArticle = memo((props: EditArticleProps) => {
    const { data } = props;
    const [article, setArticle] = useState<Article>(data);

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
