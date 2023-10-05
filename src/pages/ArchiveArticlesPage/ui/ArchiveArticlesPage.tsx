import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Text } from '@/shared/ui/redesigned/Text';
import { getUserAuthData } from '@/entities/User';
import { useGetProfileDataQuery } from '@/entities/Profile';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Article } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { unArchiveArticle } from '../model/services/unArchiveArticle';
import { getRouteArticleDetails } from '@/shared/const/router';
import EyeIcon from '@/shared/assets/icons/eye-re.svg';
import cls from './ArchiveArticlesPage.module.scss';

const ArchiveArticlesPage = () => {
    const { t } = useTranslation();
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
        return (
            <VStack
                max
                gap="16"
            >
                <Text title={t('Архів')} />
                <HStack
                    gap="16"
                    max
                    wrap="wrap"
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <Card
                            padding="0"
                            className={cls.card}
                            border="round"
                            key={n}
                        >
                            <Skeleton
                                width="100%"
                                height={200}
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
                                    <Skeleton
                                        width={80}
                                        height={20}
                                    />
                                    <HStack gap="4">
                                        <Skeleton
                                            width={32}
                                            height={32}
                                            borderRadius="50%"
                                        />
                                        <Skeleton
                                            width={50}
                                            height={20}
                                        />
                                    </HStack>
                                </HStack>
                                <Skeleton
                                    width="100%"
                                    height={32}
                                    borderRadius="12px"
                                />
                            </VStack>
                        </Card>
                    ))}
                </HStack>
            </VStack>
        );
    }

    return (
        <VStack
            max
            gap="16"
        >
            <Text title={t('Архів')} />
            <HStack
                gap="16"
                max
                wrap="wrap"
            >
                {profile?.archive?.map((article) => (
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
                ))}
            </HStack>
        </VStack>
    );
};

export default memo(ArchiveArticlesPage);
