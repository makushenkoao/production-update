import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateInteractiveProps } from '../CreateInteractivePage';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Sudoku } from '@/features/Sudoku';

export const CreateSudoku = memo((props: CreateInteractiveProps) => {
    const { onSubmit, updateField, interactive } = props;
    const { t } = useTranslation();

    const handleCellValueChange = (
        rowIndex: number,
        colIndex: number,
        value: number,
    ) => {
        const updatedGrid = [...interactive.sudoku.grid];

        if (updatedGrid[rowIndex][colIndex] > 9) {
            updatedGrid[rowIndex][colIndex] = value % 10;
        }

        updatedGrid[rowIndex][colIndex] = value;
        updateField('sudoku', { grid: updatedGrid });
    };

    return (
        <Card
            max
            padding="24"
            border="partial"
        >
            <form onSubmit={onSubmit}>
                <VStack
                    max
                    gap="16"
                >
                    <Text
                        text={t('Створити судоку')}
                        bold
                    />
                    <Sudoku
                        sudoku={interactive.sudoku.grid}
                        handleCellValueChange={handleCellValueChange}
                    />
                    <HStack
                        max
                        justify="end"
                    >
                        <Button type="submit">{t('Створити судоку')}</Button>
                    </HStack>
                </VStack>
            </form>
        </Card>
    );
});
