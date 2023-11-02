import { useCallback, useEffect, useState } from 'react';

import { Sudoku } from '../../../model/types/interactive';
import { useInteractive } from '../useInteractive/useInteractive';

interface SudokuMessage {
    content?: string;
    isValid?: boolean;
}

interface InterfaceResult {
    onChangeSudokuCell: (
        rowIndex: number,
        colIndex: number,
        value: number,
    ) => void;
    handleCheckSudoku: (grid?: number[][]) => void;
    sudokuMessage: SudokuMessage;
    sudoku?: number[][];
}

export const useInteractiveSudoku = (data?: Sudoku[]): InterfaceResult => {
    const { currentIndex } = useInteractive(data);
    const [sudoku, setSudoku] = useState<number[][] | undefined>(undefined);
    const [sudokuMessage, setSudokuMessage] = useState<SudokuMessage>({});

    useEffect(() => {
        setSudoku(data?.[currentIndex].grid);
    }, [currentIndex, data]);

    const onChangeSudokuCell = useCallback(
        (rowIndex: number, colIndex: number, value: number) => {
            if (!sudoku) return;

            const updatedGrid = sudoku.map((row) => [...row]);

            if (updatedGrid[rowIndex][colIndex] > 9) {
                updatedGrid[rowIndex][colIndex] = value % 10;
            }

            updatedGrid[rowIndex][colIndex] = value;
            setSudoku(updatedGrid);
        },
        [sudoku],
    );

    const isSudokuValid = useCallback(() => {
        if (!sudoku) return;

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = sudoku[row][col];

                if (value === 0) {
                    return false;
                }

                if (
                    sudoku[row].includes(value, col + 1) ||
                    sudoku.map((r) => r[col]).includes(value, row + 1)
                ) {
                    return false;
                }

                const boxRow = Math.floor(row / 3) * 3;
                const boxCol = Math.floor(col / 3) * 3;

                for (let i = boxRow; i < boxRow + 3; i++) {
                    for (let j = boxCol; j < boxCol + 3; j++) {
                        if (i !== row && j !== col && sudoku[i][j] === value) {
                            return false;
                        }
                    }
                }
            }
        }

        return true;
    }, [sudoku]);

    const handleCheckSudoku = useCallback(() => {
        if (isSudokuValid()) {
            setSudokuMessage({
                content: 'Судоку правильно заповнено!',
                isValid: true,
            });
        } else {
            setSudokuMessage({
                content:
                    'Судоку заповнено неправильно. Будь ласка, перевірте ще раз.',
                isValid: false,
            });
        }
    }, [isSudokuValid]);

    return {
        onChangeSudokuCell,
        handleCheckSudoku,
        sudokuMessage,
        sudoku,
    };
};
