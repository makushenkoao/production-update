import { memo } from 'react';

import cls from './Sudoku.module.scss';

import { HStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/redesigned/Input';

interface SudokuProps {
    sudoku?: number[][];
    handleCellValueChange: (
        rowIndex: number,
        colIndex: number,
        value: number,
    ) => void;
}

export const Sudoku = memo((props: SudokuProps) => {
    const { sudoku, handleCellValueChange } = props;

    return (
        <>
            {sudoku?.map((row, rowIndex) => (
                <HStack
                    gap="8"
                    max
                    justify="center"
                    key={`row-${rowIndex}`}
                    className={classNames(
                        '',
                        {
                            [cls.third]: rowIndex % 3 === 0,
                        },
                        [],
                    )}
                >
                    {row.map((cell, colIndex) => (
                        <Input
                            key={`col-${colIndex}`}
                            value={cell === 0 ? '' : cell}
                            className={classNames(
                                cls.input,
                                {
                                    [cls.thirdInput]:
                                        colIndex === 2 || colIndex === 5,
                                },
                                [],
                            )}
                            maxLength={1}
                            onChange={(v) =>
                                handleCellValueChange(
                                    rowIndex,
                                    colIndex,
                                    Number(v) || 0,
                                )
                            }
                        />
                    ))}
                </HStack>
            ))}
        </>
    );
});
