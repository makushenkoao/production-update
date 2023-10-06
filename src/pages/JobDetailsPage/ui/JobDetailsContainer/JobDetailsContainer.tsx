import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { AvatarWithUsername } from '@/shared/ui/redesigned/AvatarWithUsername';
import { JOB_MOCK_DATA } from '../../model/const/job_details';

export const JobDetailsContainer = memo(() => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    return (
        <Card
            padding="24"
            border="round"
            max
        >
            <VStack
                max
                gap="16"
            >
                <Text title={JOB_MOCK_DATA.title} />
                <AppLink to={getRouteProfile(JOB_MOCK_DATA.user.id)}>
                    <AvatarWithUsername
                        src={JOB_MOCK_DATA.user.avatar}
                        username={JOB_MOCK_DATA.user.username}
                        size={30}
                    />
                </AppLink>
                <Text
                    title={t('Опис')}
                    text={JOB_MOCK_DATA.description}
                />
                <Text
                    title={t("Обов'зки")}
                    text={JOB_MOCK_DATA.responsibilities}
                />
                <Text
                    title={t('Вимоги')}
                    text={JOB_MOCK_DATA.requirements}
                />
                <Text
                    title={t('Про компанію')}
                    text={JOB_MOCK_DATA.aboutCompany}
                />
            </VStack>
        </Card>
    );
});
