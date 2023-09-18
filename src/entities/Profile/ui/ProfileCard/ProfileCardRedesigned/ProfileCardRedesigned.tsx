import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileRating } from '@/features/profileRating';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { ProfileCardProps } from '../ProfileCard';
import { AverageUserRating } from '@/features/averageUserRating';
import cls from './ProfileCardRedesigned.module.scss';

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
    const {
        className,
        data,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry,
        readonly,
        isLoading,
        error,
    } = props;

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <Card
                max
                padding="24"
                className={classNames('', {}, [className])}
            >
                <VStack gap="32">
                    <HStack
                        max
                        justify="center"
                    >
                        <Skeleton
                            height={128}
                            width={128}
                            borderRadius="50%"
                        />
                    </HStack>
                    <HStack
                        gap="24"
                        max
                    >
                        <VStack
                            max
                            gap="16"
                        >
                            <Skeleton
                                height={38}
                                width="100%"
                            />
                            <Skeleton
                                height={38}
                                width="100%"
                            />
                            <Skeleton
                                height={38}
                                width="100%"
                            />
                            <Skeleton
                                height={38}
                                width="100%"
                            />
                        </VStack>
                        <VStack
                            max
                            gap="16"
                        >
                            <Skeleton
                                height={38}
                                width="100%"
                            />
                            <Skeleton
                                height={38}
                                width="100%"
                            />
                            <Skeleton
                                height={38}
                                width="100%"
                            />
                            <Skeleton
                                height={38}
                                width="100%"
                            />
                        </VStack>
                    </HStack>
                </VStack>
            </Card>
        );
    }

    if (error) {
        return (
            <Card
                max
                padding="24"
                className={classNames('', {}, [className])}
            >
                <HStack
                    gap="24"
                    max
                    justify="center"
                >
                    <Text
                        title={error}
                        variant="error"
                    />
                </HStack>
            </Card>
        );
    }

    return (
        <Card
            max
            padding="24"
            className={classNames(cls.ProfileCardRedesigned, {}, [className])}
        >
            <VStack gap="32">
                <HStack
                    max
                    justify="center"
                >
                    <Avatar
                        src={data?.avatar}
                        width={128}
                        height={128}
                        alt="User Avatar"
                    />
                </HStack>
                <HStack
                    max
                    justify="center"
                    gap="32"
                >
                    <VStack align="center">
                        <Text text={t('Читачі')} />
                        <Text text={String(data?.followers?.length)} />
                    </VStack>
                    <VStack align="center">
                        <Text text={t('Відстежуються')} />
                        <Text text={String(data?.following?.length)} />
                    </VStack>
                </HStack>
                <HStack
                    gap="24"
                    max
                >
                    <VStack
                        max
                        gap="16"
                    >
                        <Input
                            value={data?.firstname}
                            placeholder={t("Ваше ім'я")}
                            label={t("Ім'я")}
                            onChange={onChangeFirstname}
                            readonly={readonly}
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            value={data?.lastname}
                            placeholder={t('Ваше прізвище')}
                            label={t('Прізвище')}
                            onChange={onChangeLastname}
                            readonly={readonly}
                            data-testid="ProfileCard.lastname"
                        />
                        <Input
                            value={data?.age}
                            placeholder={t('Ваш вік')}
                            label={t('Вік')}
                            onChange={onChangeAge}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.city}
                            placeholder={t('Ваше місто')}
                            label={t('Місто')}
                            onChange={onChangeCity}
                            readonly={readonly}
                        />
                    </VStack>
                    <VStack
                        max
                        gap="16"
                    >
                        <Input
                            value={data?.username}
                            placeholder={t('Ваш нікнейм')}
                            label={t('Нікнейм')}
                            onChange={onChangeUsername}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.avatar}
                            placeholder={t('Ваше посилання на аватар')}
                            label={t('Аватар')}
                            onChange={onChangeAvatar}
                            readonly={readonly}
                        />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readonly={readonly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readonly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
            <ProfileRating />
            <AverageUserRating className={cls.averageUserRating} />
        </Card>
    );
};
