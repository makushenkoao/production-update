export interface Quote {
    text: string;
    author: string;
}

export interface Interactive {
    facts: string[];
    quotes: Quote[];
}
