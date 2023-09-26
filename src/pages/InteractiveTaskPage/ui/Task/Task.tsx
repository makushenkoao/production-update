import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface TaskProps {
    tasks?: string[];
}

export const Task = (props: TaskProps) => {
    const { tasks } = props;
    const { t } = useTranslation();
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * tasks.length);
                setCurrentTaskIndex(randomIndex);
            }, 24 * 60 * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [tasks]);

    return (
        <VStack
            max
            gap="16"
        >
            <Text
                title={t('Завдання дня')}
                text={t(`${tasks?.[currentTaskIndex]}`)}
            />
        </VStack>
    );
};
