import { FormEvent, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Comment } from '../../model/types/comment';
import { getRouteArticleDetails, getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Button } from '@/shared/ui/redesigned/Button';
import { getUserAuthData } from '@/entities/User';
import { Input } from '@/shared/ui/redesigned/Input';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addCommentForArticle } from '@/pages/ArticleDetailsPage';
import LikeIcon from '@/shared/assets/icons/like.svg';
import ReplyIcon from '@/shared/assets/icons/reply.svg';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import cls from './CommentCard.module.scss';
import { getArticleDetailsData } from '@/entities/Article';
import { sendNotification } from '@/entities/Notification';
import { Tooltip } from '@/shared/ui/redesigned/Tooltip';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
    onLikeClick?: (comment?: Comment) => void;
    onDeleteClick?: (id?: string) => void;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading, onLikeClick, onDeleteClick } = props;
    const { t } = useTranslation();
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState('');
    const authData = useSelector(getUserAuthData);
    const article = useSelector(getArticleDetailsData);
    const dispatch = useAppDispatch();

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            dispatch(
                addCommentForArticle({
                    text: replyText,
                    parentId: comment?.id || '',
                }),
            );

            dispatch(
                sendNotification({
                    id: Date.now().toString(),
                    title: `${comment?.user.username} відповів на ваш коментар`,
                    description: replyText,
                    href: getRouteArticleDetails(article?.id || ''),
                    userId: comment?.userId || '',
                }),
            );

            setReplyText('');
            setIsReplying(false);
        },
        [
            article?.id,
            comment?.id,
            comment?.user.username,
            comment?.userId,
            dispatch,
            replyText,
        ],
    );

    const toggleReply = useCallback(() => {
        setIsReplying(!isReplying);
    }, [isReplying]);

    const onReplyTextChange = useCallback((v: string) => {
        setReplyText(v);
    }, []);

    const Skeleton = SkeletonRedesigned;

    const onClick = useCallback(() => {
        onLikeClick?.(comment);
    }, [comment, onLikeClick]);

    const onDelete = useCallback(() => {
        onDeleteClick?.(comment?.id);
    }, [comment?.id, onDeleteClick]);

    if (isLoading) {
        return (
            <VStack
                gap="16"
                data-testid="CommentCard.Loading"
                className={classNames('', {}, [className])}
            >
                <HStack gap="16">
                    <Skeleton
                        width={30}
                        height={30}
                        borderRadius="50%"
                    />
                    <Skeleton
                        width={50}
                        height={15}
                    />
                </HStack>
                <Skeleton
                    width="100%"
                    height={50}
                />
            </VStack>
        );
    }

    if (!comment) return null;

    return (
        <Card
            className={classNames(cls.CommentCardRedesigned, {}, [className])}
            padding="24"
            border="round"
            max
        >
            <HStack max>
                <VStack
                    data-testid="CommentCard.Content"
                    gap="8"
                    max
                >
                    <AppLink
                        to={getRouteProfile(comment.user.id)}
                        className={cls.hover}
                    >
                        <HStack gap="8">
                            {comment.user.avatar ? (
                                <Avatar
                                    width={30}
                                    height={30}
                                    src={comment.user.avatar}
                                />
                            ) : null}
                            <Text
                                text={
                                    comment.user.id === article?.id
                                        ? `${comment.user.username} - автор статті`
                                        : comment.user.username
                                }
                                bold
                            />
                        </HStack>
                    </AppLink>
                    <Text text={comment.text} />
                    <Button
                        className={cls.replyBtn}
                        variant="filled"
                        addonRight={
                            <Icon
                                svg={ReplyIcon}
                                className={cls.icon}
                            />
                        }
                        onClick={toggleReply}
                    >
                        {t(isReplying ? 'Заховати' : 'Відповісти')}
                    </Button>
                    {isReplying && (
                        <form
                            onSubmit={onSubmit}
                            className={cls.form}
                        >
                            <HStack
                                max
                                gap="16"
                                className={cls.replyBtn}
                            >
                                <Input
                                    value={replyText}
                                    onChange={onReplyTextChange}
                                    placeholder={t('Введіть відповідь')}
                                />
                                <Button type="submit">{t('Відправити')}</Button>
                            </HStack>
                        </form>
                    )}
                </VStack>
                <HStack gap="16">
                    <VStack align="center">
                        <Tooltip title={t('Подобається')} direction="bottom left">
                            <Icon
                                svg={LikeIcon}
                                clickable
                                onClick={onClick}
                            />
                        </Tooltip>
                        <Text
                            text={String(comment?.likes.length)}
                            size="s"
                        />
                    </VStack>
                    {comment.user.id === authData?.id && (
                        <Tooltip title={t('Видалити')} direction="bottom left">
                            <Icon
                                svg={DeleteIcon}
                                clickable
                                onClick={onDelete}
                            />
                        </Tooltip>
                    )}
                </HStack>
            </HStack>
        </Card>
    );
});
