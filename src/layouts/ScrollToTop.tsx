import React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

interface Props {
    children: React.ReactNode;
}

const ScrollToTop = ({ children }: Props) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector("#back-to-top-anchor");

        if (anchor) {
            anchor.scrollIntoView({
                block: "center",
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
};

export default ScrollToTop;
