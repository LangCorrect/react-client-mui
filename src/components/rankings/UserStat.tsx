import { ListItemText, SvgIconProps, Tooltip } from "@mui/material";

interface IProps {
    title: string;
    value: number;
    icon: React.ReactElement<SvgIconProps>;
}

const UserStat = ({ title, value, icon }: IProps) => {
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
