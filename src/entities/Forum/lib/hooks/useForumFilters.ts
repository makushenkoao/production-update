import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import { forumsActions } from '../../model/slices/forumSlice';
import { getForumsSearch } from '../../model/selectors/forum';
import { getForumsService } from '../../model/services/getForumsService/getForumsService';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

export function useForumFilters() {
    const search = useSelector(getForumsSearch);
    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(getForumsService({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(forumsActions.setSearch(search));
            dispatch(forumsActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    return {
        search,
        onChangeSearch,
    };
}
