import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import cls from '../ArchiveArticlesPage.module.scss';

import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Article } from '@/entities/Article';
import EyeIcon from '@/shared/assets/icons/eye-re.svg';


interface ArchiveArticleItemProps {
    article: Article;
    onUnArchiveArticle: (article: Article) => void;
}

export const ArchiveArticleItem = memo((props: ArchiveArticleItemProps) => {
    const { article, onUnArchiveArticle } = props;
    const { t } = useTranslation();

    return (
        <Card
            padding="0"
            className={cls.card}
            border="round"
            key={article.id}
        >
            <AppImage
                fallback={
                    <Skeleton
                        width="100%"
                        height={200}
                    />
                }
                alt={article.title}
                src={article.img}
                className={cls.img}
            />
            <VStack
                className={cls.info}
                gap="4"
            >
                <HStack
                    max
                    justify="between"
                    gap="16"
                >
                    <Text text={formatDate(article.createdAt)} />
                    <HStack gap="4">
                        <Icon svg={EyeIcon} />
                        <Text
                            text={String(article.views)}
                            className={cls.views}
                        />
                    </HStack>
                </HStack>
                <Button
                    onClick={() => onUnArchiveArticle(article)}
                    fullWidth
                >
                    {t('Розархівувати')}
                </Button>
            </VStack>
        </Card>
    );
});
