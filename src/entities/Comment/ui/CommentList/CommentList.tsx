import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';
import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
    onLikeClick?: (comment?: Comment) => void;
    onDeleteClick?: (id?: string) => void;
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, comments, isLoading, onLikeClick, onDeleteClick } =
        props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames('', {}, [className])}>
                <VStack
                    max
                    gap="16"
                    align="normal"
                >
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                </VStack>
            </div>
        );
    }

    const renderComments = (parentCommentId?: string) => {
        return comments
            ?.filter((comment) => comment.parentId === parentCommentId)
            .map((comment) => (
                <VStack
                    max
                    gap="16"
                    align="normal"
                    key={comment.id}
                    className={cls.child}
                >
                    <CommentCard
                        comment={comment}
                        isLoading={isLoading}
                        onLikeClick={onLikeClick}
                        onDeleteClick={onDeleteClick}
                    />
                    {renderComments(comment.id)}
                </VStack>
            ));
    };

    return (
        <div className={classNames('', {}, [className])}>
            {comments?.length ? (
                <VStack
                    max
                    gap="16"
                    align="normal"
                >
                    {renderComments(undefined)}{' '}
                </VStack>
            ) : (
                <Text text={t('Коментарі відсутні')} />
            )}
        </div>
    );
});
