import { FormEvent, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/const/router';
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
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
    onLikeClick?: (comment?: Comment) => void;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading, onLikeClick } = props;
    const { t } = useTranslation();
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState('');
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // // @ts-ignore
            // const replyComment: Comment = {
            //     id: 'your-generated-id',
            //     articleId: comment?.articleId,
            //     userId: authData?.id,
            //     likes: [],
            //     text: replyText,
            //     parentId: comment?.id,
            // };

            dispatch(
                addCommentForArticle({
                    text: replyText,
                    parentId: comment?.id || '',
                }),
            );

            setReplyText('');
            setIsReplying(false);
        },
        [comment?.id, dispatch, replyText],
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
                                text={comment.user.username}
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
                        <form onSubmit={onSubmit} className={cls.form}>
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
                <VStack align="center">
                    <Icon
                        svg={LikeIcon}
                        clickable
                        onClick={onClick}
                    />
                    <Text
                        text={String(comment?.likes.length)}
                        size="s"
                    />
                </VStack>
            </HStack>
        </Card>
    );
});
