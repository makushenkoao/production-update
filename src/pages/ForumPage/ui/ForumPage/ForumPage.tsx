import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ForumAdditionalInfo } from '@/widgets/ForumAdditionalInfo';
import {
    ForumList,
    forumsReducer,
    getForums,
    getForumsError,
    getForumsIsLoading,
    getNextForumsService,
    initForumsService,
} from '@/entities/Forum';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import PlusIcon from '@/shared/assets/icons/create.svg';
import { Tooltip } from '@/shared/ui/redesigned/Tooltip';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { getRouteForumCreate } from '@/shared/const/router';

const reducers: ReducersList = {
    forums: forumsReducer,
};

const ForumPage = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const forums = useSelector(getForums.selectAll);
    const loading = useSelector(getForumsIsLoading);
    const navigate = useNavigate();
    const error = useSelector(getForumsError);
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(getNextForumsService());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initForumsService(searchParams));
    });

    const onNavigate = useCallback(() => {
        navigate(getRouteForumCreate());
    }, [navigate]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <StickyContentLayout
                content={
                    <Page onScrollEnd={onLoadNextPart}>
                        <ForumList
                            forums={forums}
                            loading={loading}
                            error={error}
                        />
                    </Page>
                }
                right={<ForumAdditionalInfo />}
                left={
                    <Tooltip title={t('Створити форум')}>
                        <Icon
                            svg={PlusIcon}
                            clickable
                            onClick={onNavigate}
                        />
                    </Tooltip>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(ForumPage);
