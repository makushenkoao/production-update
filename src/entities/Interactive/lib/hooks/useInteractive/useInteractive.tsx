import { FormEvent, useCallback, useEffect, useState } from 'react';

import {
    InteractivesType,
    Mystery,
    Quiz,
} from '../../../model/types/interactive';

interface InterfaceResult {
    isOpen: boolean;
    answer: string;
    isCorrect?: boolean;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onOpen: () => void;
    onClose: () => void;
    onChange: (v: string) => void;
    currentIndex: number;
}

export function useInteractive(data?: InteractivesType): InterfaceResult {
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

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const asData = data as Quiz[] | Mystery[];

            if (
                answer.toLowerCase() ===
                asData?.[currentIndex].answer.toLowerCase()
            ) {
                setIsCorrect(true);
            } else {
                setIsCorrect(false);
            }

            setAnswer('');
        },
        [data, answer, currentIndex],
    );

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
        onSubmit,
        onOpen,
        onClose,
        onChange,
        currentIndex,
    };
}
