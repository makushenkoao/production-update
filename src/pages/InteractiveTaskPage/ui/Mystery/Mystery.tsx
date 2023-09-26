import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

export const Mystery = () => {
    const { t } = useTranslation();

    return (
        <VStack
            max
            gap="16"
        >
            <Text
                title={t('Загадка дня')}
                text={t('Тут буде загадка')}
            />
            <HStack
                max
                gap="8"
            >
                <Input placeholder={t('Введіть відповідь')} />
                <Button>{t('Відповісти')}</Button>
            </HStack>
        </VStack>
    );
};
