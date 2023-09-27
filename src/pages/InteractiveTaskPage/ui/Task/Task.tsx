import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import {useInteractive} from "@/shared/lib/hooks/useInteractive/useInteractive";

interface TaskProps {
    tasks?: string[];
}

export const Task = (props: TaskProps) => {
    const { tasks } = props;
    const { t } = useTranslation();
    const { currentIndex } = useInteractive(tasks);

    return (
        <VStack
            max
            gap="16"
        >
            <Text
                title={t('Завдання дня')}
                text={t(`${tasks?.[currentIndex]}`)}
            />
        </VStack>
    );
};
