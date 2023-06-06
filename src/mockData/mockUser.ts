import { ICurrentUser } from "../context/AuthProvider";

const mockUserData: ICurrentUser = {
    id: 3,
    username: "mock_user",
    nick_name: "Reynaud Reyer",
    gender: "M",
    bio: "I'm from Nantes, France and I'm learning English",
    is_premium: true,
    user_role: "Member",
    date_joined: "2023-05-25T05:00:04.804670Z",
    get_studying_languages: [
        {
            code: "fr",
            en_name: "French",
        },
        {
            code: "ja",
            en_name: "Japanese",
        },
    ],
    get_native_languages: [
        {
            code: "vi",
            en_name: "Vietnamese",
        },
    ],
};

export default mockUserData;
