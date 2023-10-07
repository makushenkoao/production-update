import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { getJobsSearch } from '../../model/selectors/jobs';
import { getJobsService } from '../../model/services/getJobsService/getJobsService';
import { jobsActions } from '../../model/slice/jobSlice';

export function useJobFilters() {
    const search = useSelector(getJobsSearch);
    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(getJobsService({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(jobsActions.setSearch(search));
            dispatch(jobsActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    return {
        search,
        onChangeSearch,
    };
}
