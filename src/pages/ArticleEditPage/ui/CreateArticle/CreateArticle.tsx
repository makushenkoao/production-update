import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import { AddArticleBlocks } from '../AddArticleBlocks/AddArticleBlocks';
import { ArticleEditorHeader } from '../ArticleEditerHeader/ArticleEditerHeader';
import { ArticleBlocks } from '../ArticleBlocks/ArticleBlocks';
import { ArticleCreateUpdateButton } from '../ArticleCreateUpdateButton/ArticleCreateUpdateButton';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Article } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

export const CreateArticle = memo(() => {
    const authData = useSelector(getUserAuthData);

    const [article, setArticle] = useState<Article>({
        id: Date.now().toString(),
        title: '',
        // TODO - delete ignore
        // @ts-ignore
        userId: authData.id,
        subtitle: '',
        img: '',
        type: [],
        createdAt: Date.now(),
        views: 0,
        blocks: [],
    });

    return (
        <VStack
            max
            gap="32"
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
                type="create"
            />
        </VStack>
    );
});
