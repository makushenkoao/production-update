import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { ArticleBlockEditor } from '../ArticleBlockEditor/ArticleBlockEditor';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Article, ArticleBlock } from '@/entities/Article';

interface ArticleBlocksProps {
    setArticle: Dispatch<SetStateAction<Article>>;
    blocks: ArticleBlock[];
}

export const ArticleBlocks = memo((props: ArticleBlocksProps) => {
    const { blocks, setArticle } = props;
    const updateBlock = (index: number, updatedBlock: ArticleBlock) => {
        setArticle((prevArticle) => {
            const updatedBlocks = [...prevArticle.blocks];
            updatedBlocks[index] = updatedBlock;
            return { ...prevArticle, blocks: updatedBlocks };
        });
    };

    const onDeleteBlock = useCallback(
        (index: number) => {
            setArticle((prevArticle) => {
                const updatedBlocks = [...prevArticle.blocks];
                updatedBlocks.splice(index, 1); // Удаляем блок с указанным индексом
                return { ...prevArticle, blocks: updatedBlocks };
            });
        },
        [setArticle],
    );

    return (
        <VStack
            gap="16"
            max
        >
            {blocks.map((block, index) => (
                <ArticleBlockEditor
                    key={block.id}
                    index={index}
                    block={block}
                    updateBlock={updateBlock}
                    onDeleteBlock={onDeleteBlock}
                />
            ))}
        </VStack>
    );
});
