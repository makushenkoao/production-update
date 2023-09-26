import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const Task = () => {
    const { t } = useTranslation();

    return (
        <VStack
            max
            gap="16"
        >
            <Text
                title={t('Завдання дня')}
                text={t('Тут буде завдання дня')}
            />
        </VStack>
    );
};
