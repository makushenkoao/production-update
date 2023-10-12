import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    useDeleteArticlesByUserIdMutation,
    useDeleteProfileMutation,
    useDeleteUserMutation,
} from '../../../api/deleteAccount';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { getUserAuthData, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteMain } from '@/shared/const/router';

export const DeleteAccountButton = memo(() => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

    const [deleteProfile, { isLoading: isDeletingProfile }] =
        useDeleteProfileMutation();

    const [deleteArticlesByUserId, { isLoading: isDeletingArticles }] =
        useDeleteArticlesByUserIdMutation();

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onDeleteAccount = useCallback(() => {
        setIsOpen(false);
        if (authData)
            deleteArticlesByUserId(authData?.id)
                .then(() => deleteProfile(authData?.id))
                .then(() => deleteUser(authData?.id))
                .then(() => dispatch(userActions.logout()))
                .then(() => navigate(getRouteMain()));
    }, [
        authData,
        deleteArticlesByUserId,
        deleteProfile,
        deleteUser,
        dispatch,
        navigate,
    ]);

    return (
        <>
            <Button
                onClick={onOpen}
                color="error"
                disabled={
                    isDeletingArticles || isDeletingProfile || isDeletingUser
                }
            >
                {t('Видалити акаунт')}
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <VStack
                    max
                    gap="16"
                >
                    <Text text={t('Ви впевнені, що хочете видалити акаунт?')} />
                    <HStack
                        gap="16"
                        max
                        justify="end"
                    >
                        <Button onClick={onClose}>{t('Ні')}</Button>
                        <Button
                            onClick={onDeleteAccount}
                            color="error"
                        >
                            {t('Так')}
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
});
