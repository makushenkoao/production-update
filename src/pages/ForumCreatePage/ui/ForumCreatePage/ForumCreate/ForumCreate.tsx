import { FormEvent, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ForumFields } from '../ForumFields/ForumFields';
import { ForumField } from '../ForumCreatePage';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    createForumDetailsService,
    Forum,
    ForumCategory,
} from '@/entities/Forum';
import { getUserAuthData } from '@/entities/User';
import { getRouteForumDetails } from '@/shared/const/router';

export const ForumCreate = memo(() => {
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Forum>({
        id: Date.now().toString(),
        createdAt: Date.now(),
        title: '',
        description: '',
        userId: authData?.id || '',
        reply: [],
        category: ForumCategory.IT,
    });

    const handleInputChange = useCallback(
        (v: string | ForumCategory, name: ForumField) => {
            setFormData({
                ...formData,
                [name]: v,
            });
        },
        [formData],
    );

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true);

            dispatch(createForumDetailsService(formData))
                .then(() => navigate(getRouteForumDetails(formData.id)))
                .finally(() => setLoading(false));
        },
        [dispatch, formData, navigate],
    );

    return (
        <ForumFields
            formData={formData}
            onChange={handleInputChange}
            onSubmit={onSubmit}
            loading={loading}
        />
    );
});
