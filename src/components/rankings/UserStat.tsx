import { ListItemText, SvgIconProps, Tooltip } from "@mui/material";

interface Props {
    title: string;
    value: number;
    icon: React.ReactElement<SvgIconProps>;
}

const UserStat = ({ title, value, icon }: Props) => {
    return (
        <ListItemText
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
            primary={
                <Tooltip title={title} arrow>
                    {icon}
                </Tooltip>
            }
            secondary={value}
        />
    );
};

export default UserStat;
