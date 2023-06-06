import { PostInterface } from "../pages/PostPage";

const mockPostsData: PostInterface[] = [
    {
        id: 8,
        content: {
            title: "test_post 6",
            text: "hello new text hello new text hello new text hello new text hello new text hello new text hello new text hello new text hello new text hello new text hello new text",
            native_text: "-",
        },
        language: {
            code: "ja",
            en_name: "Japanese",
        },
        meta: {
            slug: "test_post-6",
            tags: [],
            permission: "public",
            created: "2023-05-25T06:23:28.052743Z",
            modified: "2023-05-25T06:23:28.052743Z",
        },
        gender_of_narration: "M",
        prompt: null,
        language_level: null,
        user: {
            username: "test_baguette",
            is_premium: false,
        },
        total_correctors: 0,
        corrected_by: [],
    },
    {
        id: 7,
        content: {
            title: "test_post 5",
            text: "another test another test another test another test another test another test another test another test another test another test another test another test",
            native_text: "string",
        },
        language: {
            code: "ja",
            en_name: "Japanese",
        },
        meta: {
            slug: "test_post-5",
            tags: ["string"],
            permission: "public",
            created: "2023-05-25T06:18:13.768640Z",
            modified: "2023-05-25T06:18:13.768640Z",
        },
        gender_of_narration: "M",
        prompt: null,
        language_level: null,
        user: {
            username: "test_baguette",
            is_premium: false,
        },
        total_correctors: 0,
        corrected_by: [],
    },
    {
        id: 6,
        content: {
            title: "test_post 4",
            text: "another test another test another test another test another test another test another test another test another test another test another test another test",
            native_text: "string",
        },
        language: {
            code: "ja",
            en_name: "Japanese",
        },
        meta: {
            slug: "test_post-4",
            tags: ["string"],
            permission: "public",
            created: "2023-05-25T06:15:29.643479Z",
            modified: "2023-05-25T06:15:29.643479Z",
        },
        gender_of_narration: "M",
        prompt: null,
        language_level: null,
        user: {
            username: "test_baguette",
            is_premium: false,
        },
        total_correctors: 0,
        corrected_by: [],
    },
    {
        id: 5,
        content: {
            title: "test_post 2",
            text: "another test another test another test another test another test another test another test another test another test another test another test another test",
            native_text: "string",
        },
        language: {
            code: "ja",
            en_name: "Japanese",
        },
        meta: {
            slug: "test_post-2",
            tags: ["string"],
            permission: "public",
            created: "2023-05-25T06:14:44.936881Z",
            modified: "2023-05-25T06:14:44.936881Z",
        },
        gender_of_narration: "M",
        prompt: null,
        language_level: null,
        user: {
            username: "test_baguette",
            is_premium: false,
        },
        total_correctors: 0,
        corrected_by: [],
    },
    {
        id: 4,
        content: {
            title: "test_post",
            text: "another test another test another test another test another test another test another test another test another test another test another test another test",
            native_text: "string",
        },
        language: {
            code: "ja",
            en_name: "Japanese",
        },
        meta: {
            slug: "test_post-1",
            tags: ["string"],
            permission: "public",
            created: "2023-05-25T06:02:28.577438Z",
            modified: "2023-05-25T06:02:28.577438Z",
        },
        gender_of_narration: "M",
        prompt: null,
        language_level: null,
        user: {
            username: "test_baguette",
            is_premium: false,
        },
        total_correctors: 0,
        corrected_by: [],
    },
    {
        id: 3,
        content: {
            title: "test_post",
            text: "testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing",
            native_text: "string",
        },
        language: {
            code: "ja",
            en_name: "Japanese",
        },
        meta: {
            slug: "test_post",
            tags: ["string"],
            permission: "public",
            created: "2023-05-25T05:54:16.008836Z",
            modified: "2023-05-25T05:54:16.008836Z",
        },
        gender_of_narration: "M",
        prompt: null,
        language_level: null,
        user: {
            username: "test_baguette",
            is_premium: false,
        },
        total_correctors: 0,
        corrected_by: [],
    },
    {
        id: 2,
        content: {
            title: "test post",
            text: "i'm a test post\r\ni'm a test post\r\ni'm a test post\r\ni'm a test post\r\ni'm a test post\r\ni'm a test post",
            native_text: "",
        },
        language: {
            code: "fr",
            en_name: "French",
        },
        meta: {
            slug: "test-post",
            tags: [],
            permission: "public",
            created: "2023-05-25T05:25:13.019758Z",
            modified: "2023-05-25T05:25:13.019758Z",
        },
        gender_of_narration: "U",
        prompt: null,
        language_level: "B1",
        user: {
            username: "test_baguette",
            is_premium: false,
        },
        total_correctors: 0,
        corrected_by: [],
    },
];

export default mockPostsData;
