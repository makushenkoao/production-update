import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Quote as IQuote } from '../../model/types/interactive';

interface QuoteProps {
    quotes?: IQuote[];
}

export const Quote = (props: QuoteProps) => {
    const { quotes } = props;
    const { t } = useTranslation();
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        if (quotes && quotes.length > 0) {
            const interval = setInterval(() => {
                setCurrentQuoteIndex(
                    (prevIndex) => (prevIndex + 1) % quotes.length,
                );
            }, 24 * 60 * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [quotes]);

    return (
        <VStack
            max
            gap="8"
        >
            <Text
                title={t('Цитата дня')}
                text={t(`${quotes?.[currentQuoteIndex].text}`)}
            />
            <HStack
                max
                justify="end"
            >
                <Text text={t(`© ${quotes?.[currentQuoteIndex].author}`)} />
            </HStack>
        </VStack>
    );
};
