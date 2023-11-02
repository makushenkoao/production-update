export type {
    InteractivesType,
    Interactive,
    Quote,
    Advice,
    Recipe,
    Quiz,
    Mystery,
    InteractiveState,
    InteractiveType,
    InteractiveFieldNameType,
    Fact,
    Task,
    Sudoku,
} from './model/types/interactive';
export {
    useGetAdvicesQuery,
    useGetFactsQuery,
    useGetMysteriesQuery,
    useGetQuizzesQuery,
    useGetQuotesQuery,
    useGetRecipesQuery,
    useGetTasksQuery,
    usePostAdvicesMutation,
    usePostFactsMutation,
    usePostMysteriesMutation,
    usePostQuizzesMutation,
    usePostQuotesMutation,
    usePostRecipesMutation,
    usePostTasksMutation,
    useGetWordleQuery,
    usePostWordleMutation,
    useGetSudokuQuery,
    usePostSudokuMutation,
} from './api/interactiveApi';
export { EInteractive } from './const/EInteractive';
export { useInteractive } from './lib/hooks/useInteractive/useInteractive';
export { useInteractiveSudoku } from '@/entities/Interactive/lib/hooks/useInteractiveSudoku/useInteractiveSudoku';
