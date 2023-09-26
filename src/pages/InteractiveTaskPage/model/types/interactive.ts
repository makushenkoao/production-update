export interface Quote {
    text: string;
    author: string;
}

export interface Advice {
    title: string;
    description: string;
}

export interface Recipe {
    title: string;
    ingredients: string[];
    instruction: string[];
}
export interface Interactive {
    facts: string[];
    quotes: Quote[];
    advices: Advice[];
    tasks: string[];
    recipes: Recipe[];
}
