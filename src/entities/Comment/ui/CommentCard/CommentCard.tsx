import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    const Skeleton = SkeletonRedesigned;

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
        <AppLink
                            to={getRouteProfile(comment.user.id)}
                            className={classNames(cls.CommentCardRedesigned, {}, [
                                className,
                                cls.hover,
                            ])}
                        >
                            <Card
                                padding="24"
                                border="round"
                                max
                            >
                                <VStack
                                    data-testid="CommentCard.Content"
                                    gap="8"
                                    max
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
                                    <Text text={comment.text} />
                                </VStack>
                            </Card>
                        </AppLink>
    );
});
