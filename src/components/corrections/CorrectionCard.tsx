import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    Card,
    CardActions,
    CardContent,
    Divider,
    IconButton,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { debounce } from "../decorators/debounce";
import { ICorrectionDraft } from "../../pages/MakeCorrectionPage";
// import ErrorIcon from "@mui/icons-material/Error";
import PerfectSentence from "./PerfectSentence";
import { ICorrection } from "./Correction";

type CorrectionFormValues = {
    correction?: string;
    note?: string;
};

const validationSchema = yup.object().shape({
    correction: yup.string(),
    note: yup.string(),
});

interface IProps {
    prid: number;
    original_sentence: string;
    onDraftSave: (data: ICorrectionDraft) => void;
    onDelete: (data: { rowId: number; type: "perfect" | "correction" }) => void;
    isCorrected: boolean;
    correction: ICorrection;
    isPublished: string;
}

const CorrectionCard = ({
    prid,
    original_sentence,
    onDraftSave,
    onDelete,
    isCorrected,
    correction,
    isPublished,
}: IProps) => {
    const [showForm, setShowForm] = useState<boolean>(
        correction?.type === "correction" || false,
    );
    const [isProcessed, setIsProcessed] = useState<boolean>(false);

    const isMarkedPerfect = correction?.type === "perfect";
    const showDiscardBtn = isProcessed || isCorrected;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isDirty },
    } = useForm<CorrectionFormValues>({
        resolver: yupResolver(validationSchema),
    });

    const isFormModified = isDirty;

    const watchCorrection = watch("correction");
    const watchNote = watch("note");

    const handleEditClick = () => {
        setShowForm(true);
        setIsProcessed(true);
    };

    const handleDeleteClick = () => {
        try {
            onDelete({
                rowId: correction.id,
                type: correction?.type,
            });
            setShowForm(false);
            setIsProcessed(false);
            reset();
        } catch (err) {
            //    
        }
    };

    // TODO: double check this
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const saveCorrectionDraft = useCallback(
        debounce(
            async (data: {
                correction: string | undefined;
                note: string | undefined;
            }) => {
                const correctionDraft = {
                    draft_type: "correction",
                    post_row_id: prid,
                    correction: data.correction,
                    note: data.note,
                } as const;

                onDraftSave(correctionDraft);
            },
            3000,
        ),
        [prid],
    );

    useEffect(() => {
        if (
            (isFormModified && watchCorrection) ||
            (isFormModified && watchNote)
        ) {
            saveCorrectionDraft({
                correction: watchCorrection,
                note: watchNote,
            });
        }
    }, [isFormModified, watchCorrection, watchNote, saveCorrectionDraft]);

    const onSubmitHandler: SubmitHandler<CorrectionFormValues> = async () => {
        const perfectDraft = {
            draft_type: "perfect",
            post_row_id: prid,
        } as const;

        await onDraftSave(perfectDraft);
        setIsProcessed(true);
    };

    return (
        <form method="post" onSubmit={handleSubmit(onSubmitHandler)}>
            <Card
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <CardContent>
                    {isMarkedPerfect ? (
                        <PerfectSentence sentence={original_sentence} />
                    ) : (
                        <Typography>{original_sentence}</Typography>
                    )}
                </CardContent>

                <CardActions disableSpacing>
                    {isPublished == "False" && (
                        <>
                            <Tooltip
                                title="This correction has been saved as a draft and will be visible when you publish your corrections."
                                arrow
                            >
                                <Typography>Draft</Typography>
                            </Tooltip>
                        </>
                    )}

                    {showDiscardBtn ? (
                        <>
                            {/* {isDraftErr && (
                                <Tooltip title="Error saving draft" arrow>
                                    <ErrorIcon color="error" />
                                </Tooltip>
                            )} */}

                            <Tooltip title="Delete" arrow>
                                <IconButton
                                    aria-label="delete-correction"
                                    color="error"
                                    onClick={handleDeleteClick}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip title="Edit sentence" arrow>
                                <IconButton
                                    aria-label="make-an-edit"
                                    onClick={handleEditClick}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Mark as perfect" arrow>
                                <IconButton
                                    aria-label="mark-as-perfect"
                                    color="success"
                                    type="submit"
                                >
                                    <CheckCircleOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                </CardActions>
            </Card>
            {showForm && (
                <>
                    <Divider />

                    <Card>
                        <CardContent>
                            <TextField
                                multiline
                                required
                                fullWidth
                                {...register("correction")}
                                label="Write your correction here"
                                error={!!errors.correction}
                                helperText={
                                    errors.correction &&
                                    String(errors.correction?.message)
                                }
                                defaultValue={
                                    correction?.correction || original_sentence
                                }
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                multiline
                                fullWidth
                                {...register("note")}
                                label="Note"
                                error={!!errors.note}
                                helperText={
                                    errors.note && String(errors.note?.message)
                                }
                                defaultValue={correction?.note || ""}
                            />
                        </CardContent>
                    </Card>
                </>
            )}
        </form>
    );
};

export default CorrectionCard;
