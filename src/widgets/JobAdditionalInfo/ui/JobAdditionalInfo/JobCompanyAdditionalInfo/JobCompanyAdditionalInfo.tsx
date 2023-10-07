import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from '../JobAdditionalInfo.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface JobCompanyAdditionalInfoProps {
    company?: string;
    email?: string;
    phone?: string;
    website?: string;
    loading?: boolean;
}

export const JobCompanyAdditionalInfo = memo(
    (props: JobCompanyAdditionalInfoProps) => {
        const { company, email, phone, website, loading } = props;
        const { t } = useTranslation();

        if (loading) {
            return (
                <Card
                    padding="24"
                    border="round"
                    className={cls.card}
                >
                    <VStack gap="8">
                        <HStack
                            max
                            gap="8"
                        >
                            <div className={cls.line} />
                            <Skeleton height={30}/>
                            <div className={cls.line} />
                        </HStack>
                        <Skeleton height={30} />
                        <Skeleton height={25} />
                        <div className={cls.line} />
                        <Skeleton height={30} />
                        <Skeleton height={25} />
                        <div className={cls.line} />
                        <Skeleton height={30} />
                        <Skeleton height={25} />
                    </VStack>
                </Card>
            );
        }

        return (
            <Card
                padding="24"
                border="round"
                className={cls.card}
            >
                <VStack gap="8">
                    <HStack
                        max
                        gap="8"
                    >
                        <div className={cls.line} />
                        <Text
                            title={company}
                            bold
                        />
                        <div className={cls.line} />
                    </HStack>
                    <Text
                        text={t('Пошта')}
                        bold
                    />
                    <AppLink to={`mailto:${email}`}>{email}</AppLink>
                    <div className={cls.line} />
                    <Text
                        text={t('Телефон')}
                        bold
                    />
                    <AppLink to={`tel:${phone}`}>{phone}</AppLink>
                    {website && (
                        <>
                            <div className={cls.line} />
                            <Text
                                text={t('Сайт')}
                                bold
                            />
                            <AppLink
                                to={website}
                                target="_blank"
                            >
                                {website}
                            </AppLink>
                        </>
                    )}
                </VStack>
            </Card>
        );
    },
);
