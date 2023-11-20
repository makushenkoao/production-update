import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ForumField } from '../ForumCreatePage';
import { ForumFields } from '../ForumFields/ForumFields';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import {
    editForumDetailsService,
    Forum,
    getForumDetailsData,
    getForumDetailsService,
    ForumCategory,
} from '@/entities/Forum';
import { getRouteForumDetails } from '@/shared/const/router';

export const ForumEdit = memo(() => {
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const forum = useSelector(getForumDetailsData);
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<Forum>({
        ...(forum || ({} as Forum)),
    });

    useEffect(() => {
        getForumDetailsService(id);
    }, [id]);

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

            dispatch(editForumDetailsService(formData))
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
            isEdit
        />
    );
});
