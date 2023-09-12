import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ARTICLE_TYPES } from '../../model/consts/article';
import { Icon } from '@/shared/ui/redesigned/Icon';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import { Article, ArticleType } from '@/entities/Article';

interface ArticleEditorHeaderProps {
    article: Article;
    setArticle: Dispatch<SetStateAction<Article>>;
}

export const ArticleEditorHeader = memo((props: ArticleEditorHeaderProps) => {
    const { article, setArticle } = props;
    const { t } = useTranslation();

    const onChangeTitle = useCallback(
        (v: string) => {
            setArticle((prevArticle) => ({ ...prevArticle, title: v }));
        },
        [setArticle],
    );

    const onChangeSubtitle = useCallback(
        (v: string) => {
            setArticle((prevArticle) => ({ ...prevArticle, subtitle: v }));
        },
        [setArticle],
    );

    const onChangeImage = useCallback(
        (v: string) => {
            setArticle((prevArticle) => ({ ...prevArticle, img: v }));
        },
        [setArticle],
    );

    const handleArticleTypeChange = useCallback(
        (selectedTypes: ArticleType) => {
            setArticle((prevArticle) => {
                if (prevArticle.type.includes(selectedTypes)) {
                    return prevArticle;
                }
                return {
                    ...prevArticle,
                    type: [...prevArticle.type, selectedTypes],
                };
            });
        },
        [setArticle],
    );

    const onDeleteArticleType = (index: number) => {
        setArticle((prevArticle) => {
            const updatedTypes = [...prevArticle.type];
            updatedTypes.splice(index, 1);
            return { ...prevArticle, type: updatedTypes };
        });
    };

    return (
        <VStack
            gap="16"
            max
        >
            <Text title={t('Основна інформація')} />
            <Input
                placeholder={t('Заголовок')}
                value={article.title || ''}
                onChange={onChangeTitle}
            />
            <Input
                placeholder={t('Підзаголовок')}
                value={article.subtitle || ''}
                onChange={onChangeSubtitle}
            />
            <Input
                placeholder={t('Посилання на зображення')}
                value={article.img || ''}
                onChange={onChangeImage}
            />
            <VStack
                max
                gap="16"
            >
                <ListBox
                    defaultValue={t('Вкажіть тип статті')}
                    label={t('Вкажіть один або кілька типів статті')}
                    items={ARTICLE_TYPES}
                    value={article?.type[article.type.length - 1] || ''}
                    onChange={handleArticleTypeChange}
                />
                {article?.type.map((item, index) => (
                    <HStack
                        max
                        gap="8"
                    >
                        <Text text={item} />
                        <Icon
                            svg={DeleteIcon}
                            clickable
                            onClick={() => onDeleteArticleType(index)}
                        />
                    </HStack>
                ))}
            </VStack>
        </VStack>
    );
});
