import { Dispatch, memo, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import AddIcon from '@/shared/assets/icons/create.svg';
import { Article, ArticleBlock } from '@/entities/Article';

interface AddArticleBlocksProps {
    setArticle: Dispatch<SetStateAction<Article>>;
}

export const AddArticleBlocks = memo((props: AddArticleBlocksProps) => {
    const { t } = useTranslation();
    const { setArticle } = props;
    const addBlock = (type: any) => {
        let newBlock: ArticleBlock;
        if (type === 'IMAGE') {
            newBlock = {
                type,
                id: Date.now().toString(),
                src: '',
                title: '',
            };
        } else if (type === 'CODE') {
            newBlock = {
                type,
                id: Date.now().toString(),
                code: '',
            };
        } else if (type === 'TEXT') {
            newBlock = {
                type,
                id: Date.now().toString(),
                title: '',
                paragraphs: [],
            };
        } else return null;

        setArticle((prevArticle) => ({
            ...prevArticle,
            blocks: [...prevArticle.blocks, newBlock],
        }));
    };

    return (
        <VStack
            gap="16"
            max
        >
            <Text title={t('Блоки детальної інформації')} />
            <VStack
                gap="16"
                max
            >
                <HStack gap="8">
                    <Icon
                        svg={AddIcon}
                        width={24}
                        height={24}
                        clickable
                        onClick={() => addBlock('TEXT')}
                    />
                    <Text text={t('Додати блок тексту')} />
                </HStack>
                <HStack gap="8">
                    <Icon
                        svg={AddIcon}
                        width={24}
                        height={24}
                        clickable
                        onClick={() => addBlock('CODE')}
                    />
                    <Text text={t('Додати блок коду')} />
                </HStack>
                <HStack gap="8">
                    <Icon
                        svg={AddIcon}
                        width={24}
                        height={24}
                        clickable
                        onClick={() => addBlock('IMAGE')}
                    />
                    <Text text={t('Додати блок зображення')} />
                </HStack>
            </VStack>
        </VStack>
    );
});
