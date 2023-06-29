export interface Prompt {
    id: number;
    username: string;
    content: string;
    difficulty_level: string;
    language: number;
    created: string;
    updated: string;
    slug: string;
    tags: string[];
    challenge: number | null;
}
