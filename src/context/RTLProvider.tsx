import { createContext, useMemo, useState } from "react";

export const RTLContext = createContext({
    toggleRTL: () => {
        /** */
    },
});

export const useRTL = () => {
    const [RTL, setRTL] = useState<"rtl" | "ltr">("ltr");

    const RtlMode = useMemo(
        () => ({
            toggleRTL: () => {
                document.dir = RTL === "ltr" ? "rtl" : "ltr";
                return setRTL((prev) => (prev === "ltr" ? "rtl" : "ltr"));
            },
        }),
        [RTL],
    );

    const RTLTheme = useMemo(
        () => ({
            direction: RTL,
        }),
        [RTL],
    );
    return [RTLTheme, RtlMode] as const;
};
