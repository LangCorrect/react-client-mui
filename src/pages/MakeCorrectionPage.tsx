import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import CorrectionCard from "../components/corrections/CorrectionCard";
import { ICorrection } from "../components/corrections/Correction";
import React, { useState } from "react";
import SnackBar from "../layouts/SnackBar";
import CorrectionService from "../service/correction.service";
import DraftService from "../service/draft.service";

interface IFullCorrection extends ICorrection {
    is_published: string;
}

interface IRow {
    postrow_id: number;
    original_sentence: string;
    correction: IFullCorrection;
    is_perfect_count?: number;
}

export interface ICorrectionDraft {
    draft_type: "correction" | "perfect";
    post_row_id: number;
    correction?: string;
    note?: string;
}

const MakeCorrectionPage = () => {
    const params = useParams();
    const slug = params.slug || "";

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState<string | null>(null);
    const overallFeedback = React.useRef<HTMLFormElement | undefined>();

    const query = useQuery(["makeCorrections", slug], () =>
        CorrectionService.getMakeCorrection(slug),
    );

    const mutation = useMutation({
        mutationFn: async (data: ICorrectionDraft) => {
            setErrMsg(null);
            return await DraftService.createDraft(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["makeCorrections", slug],
            });
        },
        onError: () => {
            setErrMsg("Error saving draft...");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (data: {
            rowId: number;
            type: "correction" | "perfect";
        }) => {
            setErrMsg(null);
            await CorrectionService.deleteCorrection(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["makeCorrections", slug],
            });
        },
        onError: () => {
            setErrMsg("Error deleting correction...");
        },
    });

    const handleSubmit = async (evt: React.SyntheticEvent) => {
        evt.preventDefault();
        setErrMsg(null);

        const payload = {
            overall_feedback: overallFeedback?.current?.value,
        };

        try {
            await CorrectionService.submitCorrections(slug, payload);
            queryClient.invalidateQueries(["makeCorrections", slug]);
            navigate(`/journals/${slug}`);
        } catch (err) {
            setErrMsg("Error publishing corrections...");
        }
    };

    if (query.isLoading) return <p>Loading...</p>;

    return (
        <>
            {errMsg && <SnackBar message={errMsg} severity="error" />}

            <Typography mb={3}>Make a correction</Typography>
            {query.data.correction_data?.map((row: IRow) => (
                <Box mb={2} key={row.postrow_id}>
                    <CorrectionCard
                        prid={row.postrow_id}
                        original_sentence={row.original_sentence}
                        isCorrected={row.correction !== null}
                        correction={row?.correction}
                        onDraftSave={mutation.mutate}
                        isPublished={row.correction?.is_published}
                        onDelete={deleteMutation.mutate}
                    />
                </Box>
            ))}
            <Box component="form" method="post" onSubmit={handleSubmit} mt={3}>
                {/* does not require any validation */}
                <TextField
                    id="overall-feedback"
                    label="Overall Feedback"
                    multiline
                    fullWidth
                    defaultValue={query.data.overall_feedback || ""}
                    inputRef={overallFeedback}
                />

                <Box display="flex" justifyContent="end" mt={3}>
                    <Button type="submit" variant="contained">
                        Publish
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default MakeCorrectionPage;
