import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useInteractive } from '@/shared/lib/hooks/useInteractive/useInteractive';

interface FactProps {
    facts?: string[];
}

export const Fact = (props: FactProps) => {
    const { facts } = props;
    const { t } = useTranslation();
    const { currentIndex } = useInteractive(facts);

    return (
        <VStack
            max
            gap="16"
        >
            <Text
                title={t('Факт дня')}
                text={t(`А ви знали, що... ${facts?.[currentIndex]}`)}
            />
        </VStack>
    );
};
