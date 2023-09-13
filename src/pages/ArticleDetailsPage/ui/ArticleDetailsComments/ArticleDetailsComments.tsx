import { memo, useCallback, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { AddCommentForm } from '@/features/AddCommentForm';
import { CommentList } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading,
} from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addLikeToComment } from '@/pages/ArticleDetailsPage/model/services/addLikeToComment/addLikeToComment';
import { Comment } from '@/entities/Comment';

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsComments = memo(
    (props: ArticleDetailsCommentsProps) => {
        const { className, id } = props;
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const comments = useSelector(getArticleComments.selectAll);
        const isLoading = useSelector(getArticleCommentsIsLoading);
        const error = useSelector(getArticleCommentsError);

        const onLikeClick = useCallback((comment?: Comment) => {
            if (!comment) return;
            dispatch(addLikeToComment(comment));
        }, [dispatch]);

        const onSendComment = useCallback(
            (text: string) => {
                dispatch(addCommentForArticle(text));
            },
            [dispatch],
        );

        useInitialEffect(() => {
            dispatch(fetchCommentsByArticleId(id));
        });

        if (error) {
            // TODO - error
            return null;
        }

        return (
            <VStack
                gap="16"
                max
                align="normal"
                className={classNames('', {}, [className])}
            >
                <Text
                    size="l"
                    title={t('Коментарі')}
                />
                <Suspense fallback={<Loader />}>
                    <AddCommentForm onSendComment={onSendComment} />
                </Suspense>
                <CommentList
                    comments={comments}
                    isLoading={isLoading}
                    // @ts-ignore
                    onLikeClick={onLikeClick}
                />
            </VStack>
        );
    },
);
