export interface Quote {
    id?: string;
    text: string;
    author: string;
}

export interface Advice {
    id?: string;
    title: string;
    description: string;
}

export interface Recipe {
    id?: string;
    title: string;
    ingredients: string[];
    instruction: string[];
}

export interface Quiz {
    id?: string;
    question: string;
    answer: string;
}

export interface Mystery {
    id?: string;
    question: string;
    answer: string;
}

export interface Task {
    id?: string;
    content: string;
}

export interface Fact {
    id?: string;
    content: string;
}

export interface Wordle {
    id?: string;
    word: string;
}

export interface Sudoku {
    id?: string;
    grid: number[][];
}

export interface Interactive {
    facts: Fact[];
    quotes: Quote[];
    advices: Advice[];
    tasks: Task[];
    recipes: Recipe[];
    quizzes: Quiz[];
    mysteries: Mystery[];
    wordle: Wordle[];
    sudoku: Sudoku[];
}

export type InteractivesType =
    | Task[]
    | Fact[]
    | Quote[]
    | Advice[]
    | Recipe[]
    | Quiz[]
    | Mystery[]
    | Wordle[]
    | Sudoku[];

export interface InteractiveState {
    task: Task;
    quote: Quote;
    advice: Advice;
    fact: Fact;
    recipe: Recipe;
    quiz: Quiz;
    mystery: Mystery;
    wordle: Wordle;
    sudoku: Sudoku;
}

export type InteractiveType =
    | Task
    | Fact
    | Quote
    | Advice
    | Recipe
    | Quiz
    | Mystery
    | Wordle
    | Sudoku;

export type InteractiveFieldNameType =
    | 'quiz'
    | 'fact'
    | 'task'
    | 'quote'
    | 'mystery'
    | 'advice'
    | 'recipe'
    | 'wordle'
    | 'sudoku';
