import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Advice as IAdvice } from '../../model/types/interactive';

interface AdviceProps {
    advices?: IAdvice[];
}

export const Advice = (props: AdviceProps) => {
    const { advices } = props;
    const { t } = useTranslation();
    const [currentAdviceIndex, setCurrentAdviceIndex] = useState(0);

    useEffect(() => {
        if (advices && advices.length > 0) {
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * advices.length);
                setCurrentAdviceIndex(randomIndex);
            }, 24 * 60 * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [advices]);

    return (
        <VStack
            max
            gap="8"
        >
            <Text title={t('Порада дня')} />
            <Text
                title={t(`${advices?.[currentAdviceIndex].title}`)}
                size="s"
            />
            <Text text={t(`${advices?.[currentAdviceIndex].description}`)} />
            <Text
                text={t(
                    'Слідуючи цим простим порадам, ви швидко помітите позитивні зміни!',
                )}
                bold
            />
        </VStack>
    );
};
