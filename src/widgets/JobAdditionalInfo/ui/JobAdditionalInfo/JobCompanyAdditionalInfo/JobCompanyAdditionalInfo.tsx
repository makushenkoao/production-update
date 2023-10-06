import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from '../JobAdditionalInfo.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Card } from '@/shared/ui/redesigned/Card';

interface JobCompanyAdditionalInfoProps {
    company: string;
    email: string;
    phone: string;
    website?: string;
}

export const JobCompanyAdditionalInfo = memo(
    (props: JobCompanyAdditionalInfoProps) => {
        const { company, email, phone, website } = props;
        const { t } = useTranslation();

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
