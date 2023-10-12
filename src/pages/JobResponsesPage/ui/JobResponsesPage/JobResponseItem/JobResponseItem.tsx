import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/shared/ui/redesigned/Card';
import { JobResponse } from '@/entities/Job';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { useGetProfileDataQuery } from '@/entities/Profile';
import { AvatarWithUsername } from '@/shared/ui/redesigned/AvatarWithUsername';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface JobResponseItemProps {
    response?: JobResponse;
}

export const JobResponseItem = memo((props: JobResponseItemProps) => {
    const { response } = props;
    const { t } = useTranslation();
    const { data: profile, isLoading } = useGetProfileDataQuery(
        response?.userId,
    );

    return (
        <Card
            max
            padding="24"
            border="round"
        >
            <VStack
                max
                gap="16"
            >
                {isLoading ? (
                    <HStack gap="8">
                        <Skeleton
                            width={48}
                            height={48}
                            borderRadius="50%"
                        />
                        <Skeleton
                            width={100}
                            height={24}
                        />
                    </HStack>
                ) : (
                    <AppLink to={getRouteProfile(profile?.id || '')}>
                        <AvatarWithUsername
                            src={profile?.avatar}
                            username={profile?.username}
                            size={48}
                        />
                    </AppLink>
                )}
                <VStack
                    max
                    gap="4"
                >
                    <Text
                        text={t('Супровідний лист кандидата:')}
                        bold
                    />
                    <Text text={response?.description} />
                    <AppLink to={response?.href || ''}>{t('Резюме')}</AppLink>
                </VStack>
            </VStack>
        </Card>
    );
});
