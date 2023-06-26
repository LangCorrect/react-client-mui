import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import { ColorModeContext, useColorMode } from "./theme";
import { useRTL, RTLContext } from "./context/RTLProvider";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";

import createCache from "@emotion/cache";
import React, { useMemo } from "react";
import { prefixer } from "stylis";

function App() {
    const [theme, colorMode] = useColorMode();
    const [RTLTheme, RtlMode] = useRTL();

    const newTheme = {
        ...theme,
        ...RTLTheme,
    };

    const Container = useMemo(() => {
        const isRTL = RTLTheme.direction === "rtl";

        const cacheIsRtl = createCache({
            key: isRTL ? "muirtl" : "muiltr",
            stylisPlugins: isRTL ? [rtlPlugin, prefixer] : [],
        });

        return ({ children }: { children: React.ReactNode }) => (
            <CacheProvider value={cacheIsRtl}>{children}</CacheProvider>
        );
    }, [RTLTheme.direction]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <RTLContext.Provider value={RtlMode}>
                <Container>
                    <ThemeProvider theme={newTheme}>
                        <CssBaseline />
                        <BrowserRouter>
                            <RoutesList />
                        </BrowserRouter>
                    </ThemeProvider>
                </Container>
            </RTLContext.Provider>
        </ColorModeContext.Provider>
    );
}

export default App;
