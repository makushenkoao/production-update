import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CreateArticle } from '../CreateArticle/CreateArticle';
import { EditArticle } from '../EditArticle/EditArticle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    articleDetailsReducer,
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
    fetchArticleById,
} from '@/entities/Article';

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

const ArticleEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    });

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            {/* TODO - add page and delete overflow-y */}
            {/* <Page> */}
            {isEdit ? (
                article && <EditArticle data={article} />
            ) : (
                <CreateArticle />
            )}
            {/* </Page> */}
        </DynamicModuleLoader>
    );
};

export default memo(ArticleEditPage);
