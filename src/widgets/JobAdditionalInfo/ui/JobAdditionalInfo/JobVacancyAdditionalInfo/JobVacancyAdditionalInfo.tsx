import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from '../JobAdditionalInfo.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIcon from '@/shared/assets/icons/eye-re.svg';
import { formatDate } from '@/shared/lib/utils/formatDate/formatDate';
import { Card } from '@/shared/ui/redesigned/Card';
import { JobCategory } from '@/shared/const/job';

interface JobVacancyAdditionalInfoProps {
    salary: string;
    category: JobCategory[];
    experience: string;
    location: string;
    type: string;
    views: number;
    createdAt: number;
}

export const JobVacancyAdditionalInfo = memo(
    (props: JobVacancyAdditionalInfoProps) => {
        const {
            salary,
            category,
            experience,
            location,
            type,
            views,
            createdAt,
        } = props;
        const { t } = useTranslation();

        return (
            <Card
                padding="24"
                border="round"
                className={cls.card}
            >
                <VStack gap="8">
                    <Text text={t(`Зарплата: ${salary}`)} />
                    <div className={cls.line} />
                    <Text text={t(`Категорії: ${category.join(', ')}`)} />
                    <div className={cls.line} />
                    <Text text={experience} />
                    <div className={cls.line} />
                    <Text text={location} />
                    <div className={cls.line} />
                    <Text text={type} />
                    <HStack
                        max
                        justify="between"
                        className={cls.info}
                    >
                        <HStack gap="4">
                            <Icon svg={EyeIcon} />
                            <Text text={String(views)} />
                        </HStack>
                        <Text text={formatDate(createdAt)} />
                    </HStack>
                </VStack>
            </Card>
        );
    },
);
