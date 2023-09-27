import { useCallback, useEffect, useState } from 'react';
import { InteractiveType, Mystery, Quiz } from '@/pages/InteractiveTaskPage';

interface InterfaceResult {
    isOpen: boolean;
    answer: string;
    isCorrect?: boolean;
    onClick: () => void;
    onOpen: () => void;
    onClose: () => void;
    onChange: (v: string) => void;
    currentIndex: number;
}

export function useInteractive(data?: InteractiveType): InterfaceResult {
    const [isOpen, setIsOpen] = useState(false);
    const [answer, setAnswer] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (data && data.length > 0) {
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * data.length);
                setCurrentIndex(randomIndex);
            }, 24 * 60 * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [data, setCurrentIndex]);

    const onClick = useCallback(() => {
        const asData = data as Quiz[] | Mystery[];

        if (
            answer.toLowerCase() === asData?.[currentIndex].answer.toLowerCase()
        ) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }

        setAnswer('');
    }, [data, answer, currentIndex]);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onChange = useCallback((v: string) => {
        setAnswer(v);
    }, []);

    return {
        isOpen,
        answer,
        isCorrect,
        onClick,
        onOpen,
        onClose,
        onChange,
        currentIndex,
    };
}
