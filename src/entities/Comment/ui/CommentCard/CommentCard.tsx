import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import LikeIcon from '@/shared/assets/icons/like.svg';
import cls from './CommentCard.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
    onLikeClick?: (comment?: Comment) => void;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading, onLikeClick } = props;

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
