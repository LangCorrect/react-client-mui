export const ACCESS_TOKEN_STORAGE_ID = "LC-access";
export const REFRESH_TOKEN_STORAGE_ID = "LC-refresh";

export const themeSettings = (mode: "light" | "dark") => {
    return {
        palette: {
            mode: mode,
            primary: {
                main: "#6174dd",
            },
            secondary: {
                main: "#ff7979",
            },
        },
        typography: {
            fontFamily: `"Roboto", "sans-serif"`,
        },
    };
};
