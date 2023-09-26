import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface FactProps {
    facts?: string[];
}

export const Fact = (props: FactProps) => {
    const { facts } = props;
    const { t } = useTranslation();
    const [currentFactIndex, setCurrentFactIndex] = useState(0);

    useEffect(() => {
        if (facts && facts.length > 0) {
            const interval = setInterval(() => {
                setCurrentFactIndex(
                    (prevIndex) => (prevIndex + 1) % facts.length,
                );
            }, 24 * 60 * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [facts]);

    return (
        <VStack
            max
            gap="16"
        >
            <Text
                title={t('Факт дня')}
                text={t(`А ви знали, що... ${facts?.[currentFactIndex]}`)}
            />
        </VStack>
    );
};
