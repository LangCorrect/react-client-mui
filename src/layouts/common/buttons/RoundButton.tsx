import { Button, SvgIconProps, ButtonProps } from "@mui/material";
import React from "react";

interface Props extends ButtonProps {
    text: string;
    icon: React.ReactElement<SvgIconProps>;

    size: "small" | "medium" | "large";
    variant: "outlined" | "contained";
    fullWidth: boolean;
}

const RoundButton = ({ text, icon, size, variant, fullWidth, ...otherProps }: Props) => {
    return (
        <Button
            variant={variant}
            size={size}
            startIcon={icon}
            sx={{ borderRadius: 5, px: 2 }}
            fullWidth={fullWidth}
            color="inherit"
            {...otherProps}
        >
            {text}
        </Button>
    );
};

export default RoundButton;

RoundButton.defaultProps = {
    icon: undefined,
    size: "medium",
    variant: undefined,
    fullWidth: false,
};
