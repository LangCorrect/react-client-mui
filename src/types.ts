import { SvgIconProps } from "@mui/material";

export interface Language {
    code: string;
    en_name: string;
}

// These have been commented out as they have not been implemented yet

// export enum LanguageLevels {
//     A1 = "Beginner",
//     A2 = "Elementary",
//     B1 = "Intermediate",
//     B2 = "Upper-Intermediate",
//     C1 = "Advanced",
//     C2 = "Proficient",
// }

// export enum Gender {
//     M = "Male",
//     F = "Female",
//     O = "Other",
//     U = "Prefer not to say"
// }

export interface PostContent {
    title: string;
    text: string;
    native_text?: string;
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
    response_count: number;
}

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
    is_published?: boolean;
}

export type CorrectionFormValues = {
    correction?: string;
    note?: string;
};

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

export interface Comment {
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
    corrections_made_count: number;
    corrections_received_count: number;
    correction_ratio: number;
    contributions_count: number;
    posts_count: number;
    prompts_count: number;
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
};

export interface Followers {
    count: number;
    next: null;
    previous: null;
    results: {
        username: string;
    }[];
}

export interface Following {
    count: number;
    next: null;
    previous: null;
    results: {
        username: string;
    }[];
}

export interface Notification {
    id: number;
    verb: string;
    description: string;
    timestamp: Date;
    slug: number;
    action_object: string;
    actor: string;
    obj_slug: string;
}

export enum NotificationTypes {
    Post = "new_post",
    Correction = "new_correction",
    Follow = "new_follower",
    // Comment = "new_comment",
    // Reply = "new_reply"
    // Like = "new_like",
    // Deletion = "new_deletion"
}
