import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ForumDetailsContainer } from './ForumDetailsContainer/ForumDetailsContainer';
import { ForumDetailsForm } from './ForumDetailsForm/ForumDetailsForm';
import { ForumDetailsMessagesList } from './ForumDetailsMessagesList/ForumDetailsMessagesList';

import { Page } from '@/widgets/Page';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    forumDetailsReducer,
    getForumDetailsData,
    getForumDetailsError,
    getForumDetailsIsLoading,
    getForumDetailsService,
} from '@/entities/Forum';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ForumDetailsAdditionalInfo } from '@/widgets/ForumDetailsAdditionalInfo';
import { VStack } from '@/shared/ui/redesigned/Stack';

const reducers: ReducersList = {
    forumDetails: forumDetailsReducer,
};

const ForumDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const forumDetails = useSelector(getForumDetailsData);
    const loading = useSelector(getForumDetailsIsLoading);
    const error = useSelector(getForumDetailsError);

    useEffect(() => {
        dispatch(getForumDetailsService(id));
    }, [dispatch, id]);

    const onClick = useCallback(() => {}, []);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <StickyContentLayout
                content={
                    <Page>
                        <VStack
                            max
                            gap="16"
                        >
                            <ForumDetailsContainer
                                forum={forumDetails}
                                loading={loading}
                            />
                            <ForumDetailsForm loading={loading} />
                            <ForumDetailsMessagesList
                                loading={loading}
                                messages={forumDetails?.reply}
                            />
                        </VStack>
                    </Page>
                }
                right={
                    <ForumDetailsAdditionalInfo
                        forum={forumDetails}
                        loading={loading}
                    />
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(ForumDetailsPage);
