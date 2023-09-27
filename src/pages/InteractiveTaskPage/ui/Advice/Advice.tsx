import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Advice as IAdvice } from '../../model/types/interactive';
import { useInteractive } from '@/shared/lib/hooks/useInteractive/useInteractive';

interface AdviceProps {
    advices?: IAdvice[];
}

export const Advice = (props: AdviceProps) => {
    const { advices } = props;
    const { t } = useTranslation();
    const { currentIndex } = useInteractive(advices);

    return (
        <VStack
            max
            gap="8"
        >
            <Text title={t('Порада дня')} />
            <Text
                title={t(`${advices?.[currentIndex].title}`)}
                size="s"
            />
            <Text text={t(`${advices?.[currentIndex].description}`)} />
            <Text
                text={t(
                    'Слідуючи цим простим порадам, ви швидко помітите позитивні зміни!',
                )}
                bold
            />
        </VStack>
    );
};
