import React from 'react';
import { useTranslation } from 'react-i18next';

import cls from './Sudoku.module.scss';

import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const SudokuSkeleton = () => {
    const { t } = useTranslation();

    return (
        <VStack
            max
            gap="16"
        >
            <Text title={t('Судоку')} />
            {[
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
            ].map((row, rowIndex) => (
                <div
                    key={`row-${rowIndex}`}
                    className={classNames(
                        cls.inputWrapper,
                        {
                            [cls.third]: rowIndex % 3 === 0,
                        },
                        [],
                    )}
                >
                    {row.map((_, colIndex) => (
                        <Skeleton
                            key={colIndex}
                            className={classNames(
                                cls.input,
                                {
                                    [cls.thirdInput]:
                                        colIndex === 2 || colIndex === 5,
                                },
                                [],
                            )}
                        />
                    ))}
                </div>
            ))}
            <HStack
                max
                justify="end"
            >
                <Skeleton
                    height={30}
                    width={150}
                    borderRadius="12px"
                />
            </HStack>
        </VStack>
    );
};
