import React from "react";
import {
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import "./Correction.css";
import DeleteIcon from "@mui/icons-material/Delete";
import PerfectSentence from "./PerfectSentence";
import CorrectedSentence from "./CorrectedSentence";

export interface ICorrection {
    id: number;
    user: string;
    type: "perfect" | "correction";
    order: number;
    original_sentence: string;
    correction?: string;
    note?: string;
    pretty_html?: string;
    correction_type?: string[];
}

export interface CorrectionPropInterface {
    data: ICorrection;
}

const Correction = ({ data }: CorrectionPropInterface) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderCorrection =
        data.type === "perfect" ? (
            <PerfectSentence sentence={data.original_sentence} />
        ) : (
            <CorrectedSentence sentence={data?.pretty_html} note={data?.note} />
        );

    return (
        <>
            <ListItem
                key={data.id}
                secondaryAction={
                    <>
                        <IconButton
                            edge="end"
                            aria-label="options"
                            aria-controls={open ? "correction-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="correction-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "correction-button",
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <EditIcon />
                                </ListItemIcon>
                                <ListItemText>Edit</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <DeleteIcon />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <ReplyIcon />
                                </ListItemIcon>
                                <ListItemText>Reply</ListItemText>
                            </MenuItem>
                        </Menu>
                    </>
                }
                sx={{
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                }}
            >
                {renderCorrection}
            </ListItem>
            <Divider />
        </>
    );
};

export default Correction;
