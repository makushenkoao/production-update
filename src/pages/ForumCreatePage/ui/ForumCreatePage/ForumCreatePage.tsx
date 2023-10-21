import { useParams } from 'react-router-dom';

import { ForumEdit } from './ForumEdit/ForumEdit';
import { ForumCreate } from './ForumCreate/ForumCreate';

import { Page } from '@/widgets/Page';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { forumDetailsReducer } from '@/entities/Forum';

const reducers: ReducersList = {
    forumDetails: forumDetailsReducer,
};

export type ForumField = 'title' | 'description' | 'category';

const ForumCreatePage = () => {
    const { id } = useParams();

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <Page>{id ? <ForumEdit /> : <ForumCreate />}</Page>
        </DynamicModuleLoader>
    );
};

export default ForumCreatePage;
