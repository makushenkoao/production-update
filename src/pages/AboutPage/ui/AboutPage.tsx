import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';

const AboutPage = () => {
    const { t } = useTranslation();
    return (
        <Page data-testid="AboutPage">
            <Text
                title={t('Опис проекту')}
                text={t(
                    // eslint-disable-next-line max-len
                    'Ласкаво просимо на наш сайт! Ми - платформа для публікації та перегляду статей на різні теми. У нас ви знайдете інформацію, яка вас цікавить, у зручному форматі. Наша місія полягає у створенні дружньої та відкритої спільноти, де кожен може ділитися своїми знаннями, досвідом та ідеями. Незалежно від вашої області інтересів, у нас завжди є щось нове та корисне для вас. Приєднуйтесь до нас і станьте частиною нашої спільноти статтею і знань!',
                )}
            />
        </Page>
    );
};

export default AboutPage;
