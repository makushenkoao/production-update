import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import {useInteractive} from "@/shared/lib/hooks/useInteractive/useInteractive";
import {Quote as IQuote} from "@/entities/Interactive";

interface QuoteProps {
    quotes?: IQuote[];
}

export const Quote = (props: QuoteProps) => {
    const { quotes } = props;
    const { t } = useTranslation();
    const { currentIndex } = useInteractive(quotes);

    return (
        <VStack
            max
            gap="8"
        >
            <Text
                title={t('Цитата дня')}
                text={t(`${quotes?.[currentIndex].text}`)}
            />
            <HStack
                max
                justify="end"
            >
                <Text text={t(`© ${quotes?.[currentIndex].author}`)} />
            </HStack>
        </VStack>
    );
};
