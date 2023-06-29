import { SvgIconProps } from "@mui/material";

export interface Language {
    code: string;
    en_name: string;
}

export interface PostContent {
    title: string;
    text: string;
    native_text?: string;
    nativeText?: string; // TODO: refactor this
}

export interface PostMeta {
    slug: string;
    tags: string[];
    permission: string;
    created: string;
    modified: string;
}

export interface PostUser {
    username: string;
    is_premium: boolean;
}

export interface Post {
    id: number;
    content: PostContent;
    language: Language;
    meta: PostMeta;
    gender_of_narration: string;
    prompt: null | string;
    language_level: null | string;
    user: PostUser;
    total_correctors: number;
    corrected_by: string[];
}

export type PostFormValues = {
    title: string;
    text: string;
    native_text?: string;
    language: string;
    gender_of_narration: string;
    permission: string;
    tags?: string;
};

export interface Ranking {
    username: string;
    total: number;
    posts: number;
    corrections: number;
    joined: string;
}

export interface UserStat {
    title: string;
    icon: React.ReactElement<SvgIconProps>;
    key: keyof Ranking;
}

export interface Correction {
    id: number;
    user: string;
    type: "perfect" | "correction";
    order: number;
    original_sentence: string;
    correction?: string;
    note?: string;
    pretty_html?: string;
    correction_type?: string[];
    is_published?: string; // TODO: change to boolean
}

export type CorrectionFormValues = {
    correction?: string;
    note?: string;
}

export interface CorrectionRow {
    postrow_id: number;
    original_sentence: string;
    correction: Correction;
    is_perfect_count?: number;
}

export interface CorrectionDraft {
    draft_type: "correction" | "perfect";
    post_row_id: number;
    correction?: string;
    note?: string;
}

export interface OverallFeedback {
    id?: string;
    comment?: string;
    username?: string;
}

export interface Comment{
    id: string;
    username: string;
    text: string;
}

export interface UserCorrection {
    username: string;
    corrections: Correction[];
    comments: Comment[];
    overall_feedback: OverallFeedback[];
}


export interface User {
    id: number;
    username: string;
    nick_name: string;
    bio: string;
    gender: string;
    is_premium: boolean;
    user_role: string;
    date_joined: string;
    get_studying_languages: Language[];
    get_native_languages: Language[];
}

export type UserRegisterFormValues = {
    username: string;
    password: string;
    password2: string;
    email: string;
    native_language: string;
    studying_language: string;
    studying_level: string;
    gender: string;
}
