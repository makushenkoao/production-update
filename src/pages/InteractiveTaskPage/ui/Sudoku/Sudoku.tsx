import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { SudokuSkeleton } from './SudokuSkeleton';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    useGetSudokuQuery,
    useInteractiveSudoku,
} from '@/entities/Interactive';
import { Sudoku as UISudoku } from '@/features/Sudoku';

export const Sudoku = memo(() => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetSudokuQuery();
    const { sudoku, sudokuMessage, handleCheckSudoku, onChangeSudokuCell } =
        useInteractiveSudoku(data);

    if (isLoading) {
        return <SudokuSkeleton />;
    }

    return (
        <VStack
            max
            gap="16"
        >
            <Text title={t('Судоку')} />
            <UISudoku
                handleCellValueChange={onChangeSudokuCell}
                sudoku={sudoku}
            />
            <HStack
                max
                justify="end"
            >
                <Button onClick={() => handleCheckSudoku(sudoku)}>
                    {t('Перевірити')}
                </Button>
            </HStack>
            {sudokuMessage.content && (
                <Text
                    text={sudokuMessage.content}
                    variant={sudokuMessage.isValid ? 'success' : 'error'}
                />
            )}
        </VStack>
    );
});
