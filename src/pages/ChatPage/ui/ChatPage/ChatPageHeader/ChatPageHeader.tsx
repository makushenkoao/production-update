import React from 'react';
import { useParams } from 'react-router-dom';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { Card } from '@/shared/ui/redesigned/Card';
import { UserInfo } from '@/features/UserInfo';

export const ChatPageHeader = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return null;

    return (
        <Card
            max
            padding="24"
        >
            <AppLink
                to={getRouteProfile(id)}
                max
            >
                <UserInfo userId={id} />
            </AppLink>
        </Card>
    );
};
