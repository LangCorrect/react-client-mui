import { Stars } from "@mui/icons-material";

interface Props {
    fontSize?: "inherit" | "small" | "medium" | "large";
}

const PremiumIcon = ({ fontSize = "small" }: Props) => (
    <Stars color="primary" fontSize={fontSize} />
);

export default PremiumIcon;
