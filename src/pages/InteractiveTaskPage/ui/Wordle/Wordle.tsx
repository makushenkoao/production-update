import { FormEvent, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './Wordle.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useGetWordleQuery, useInteractive } from '@/entities/Interactive';

export const Wordle = memo(() => {
    const { t } = useTranslation();
    const { data, isLoading, error } = useGetWordleQuery();
    const { currentIndex } = useInteractive();
    const secretWord = data?.[currentIndex]?.word;
    const maxAttempts = 5;
    const [incorrectWord, setIncorrectWord] = useState<string[]>([]);
    const [guessedWord, setGuessedWord] = useState('');
    const [attempts, setAttempts] = useState(maxAttempts);
    const [displayedLetters, setDisplayedLetters] = useState([
        '',
        '',
        '',
        '',
        '',
    ]);
    const [letterClasses, setLetterClasses] = useState<
        { letter: string; class: string }[]
    >([]);

    const handleGuessWord = useCallback((v: string) => {
        setGuessedWord(v);

        const newDisplayedLetters = v.split('');
        setDisplayedLetters(
            newDisplayedLetters.concat(
                Array(5 - newDisplayedLetters.length).fill(''),
            ),
        );
    }, []);

    const resetGame = useCallback(() => {
        setGuessedWord('');
        setAttempts(maxAttempts);
        setDisplayedLetters(['', '', '', '', '']);
        setIncorrectWord([]);
        setLetterClasses([]);
    }, []);

    const resetAfterSubmit = useCallback(() => {
        setGuessedWord('');
        setDisplayedLetters(['', '', '', '', '']);
    }, []);

    const checkWord = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!secretWord) return;

            const secretArray = secretWord.toLowerCase().split('');
            const guessedArray = guessedWord.toLowerCase().split('');

            const letterClasses: { letter: string; class: string }[] = [];

            for (let i = 0; i < secretArray.length; i++) {
                if (secretArray[i] === guessedArray[i]) {
                    letterClasses.push({
                        letter: guessedArray[i],
                        class: cls.right,
                    });
                } else if (
                    secretArray.includes(guessedArray[i]) &&
                    !letterClasses.some(
                        (letter) =>
                            letter.class === cls.right &&
                            letter.letter === guessedArray[i],
                    )
                ) {
                    letterClasses.push({
                        letter: guessedArray[i],
                        class: cls.partially,
                    });
                } else {
                    letterClasses.push({ letter: guessedArray[i], class: '' });
                }
            }

            const isCorrect = letterClasses.every(
                (letter) => letter.class === cls.right,
            );

            if (isCorrect) {
                alert(t('Вітаємо! Ви вгадали слово.'));
                resetGame();
            } else {
                const remainingAttempts = attempts - 1;
                if (remainingAttempts === 0) {
                    alert(
                        t(`Гру закінчено. Правильне слово: {{word}}`, {
                            word: secretWord,
                        }),
                    );
                    resetGame();
                } else {
                    setAttempts(remainingAttempts);
                    setIncorrectWord(guessedWord.split(''));
                    setLetterClasses([...letterClasses]);
                }
            }

            resetAfterSubmit();
        },
        [secretWord, guessedWord, resetAfterSubmit, t, resetGame, attempts],
    );

    return (
        <form onSubmit={checkWord}>
            <VStack
                max
                gap="16"
            >
                <Text
                    title={t('Гра Wordle')}
                    text={t('Введіть слово українською мовою')}
                />
                <HStack
                    max
                    gap="8"
                >
                    {incorrectWord?.map((letter, index) => (
                        <div
                            key={`${index}-${letter}`}
                            className={classNames(cls.letter, {}, [
                                letterClasses[index]
                                    ? letterClasses[index].class
                                    : '',
                            ])}
                        >
                            <Text
                                text={letter?.toUpperCase()}
                                size="l"
                            />
                        </div>
                    ))}
                </HStack>
                <HStack
                    max
                    gap="8"
                >
                    {displayedLetters.map((letter, index) => (
                        <div
                            key={`${index}-${letter}`}
                            className={cls.letter}
                        >
                            <Text
                                text={letter?.toUpperCase()}
                                size="l"
                            />
                        </div>
                    ))}
                </HStack>
                <Input
                    value={guessedWord}
                    onChange={handleGuessWord}
                    placeholder={t('Введіть слово')}
                    maxLength={secretWord?.length}
                />
                <Text
                    text={t(`Спроб залишилося {{count}}`, { count: attempts })}
                />
                <HStack
                    max
                    justify="end"
                >
                    <Button type="submit">{t('Перевірити')}</Button>
                </HStack>
            </VStack>
        </form>
    );
});
