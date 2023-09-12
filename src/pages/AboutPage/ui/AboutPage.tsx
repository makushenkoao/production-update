import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { ABOUT_ME } from '../model/consts/about';

const avatarSrc = '@/shared/assets/icons/avatar.svg';

const AboutPage = () => {
    const { t } = useTranslation();
    return (
        <Page data-testid="AboutPage">
            <VStack
                max
                gap="16"
            >
                <Text
                    title={t('Опис проекту')}
                    text={t(
                        // eslint-disable-next-line max-len
                        'Ласкаво просимо на наш сайт! Ми - платформа для публікації та перегляду статей на різні теми. У нас ви знайдете інформацію, яка вас цікавить, у зручному форматі. Наша місія полягає у створенні дружньої та відкритої спільноти, де кожен може ділитися своїми знаннями, досвідом та ідеями. Незалежно від вашої області інтересів, у нас завжди є щось нове та корисне для вас. Приєднуйтесь до нас і станьте частиною нашої спільноти статтею і знань!',
                    )}
                />
                <Text title={t('Про себе')} />
                <VStack
                    align="center"
                    max
                    gap="8"
                >
                    <Avatar
                        src={avatarSrc}
                        alt="Avatar"
                        height={100}
                        width={100}
                    />
                    <Text title={t('Макушенко Антон - Fronted Developer')} />
                </VStack>
                <VStack gap="8" max>
                    {ABOUT_ME.map((item) => (
                        <>
                            <Text title={t(item.title)} />
                            <ul>
                                {item.info.map(({ content, to, toContent }) => (
                                    <li>
                                        {t(content)}
                                        {to && (
                                            <AppLink to={to}>
                                                {t(toContent || to)}
                                            </AppLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ))}
                </VStack>
            </VStack>
        </Page>
    );
};

export default AboutPage;
