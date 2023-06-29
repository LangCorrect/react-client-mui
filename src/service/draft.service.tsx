import api from "./api";
import { CorrectionDraft } from "../types";

const createDraft = async (data: CorrectionDraft) => {
    const resp = await api.post(`drafts/`, data);
    return resp?.data;
};

const DraftService = {
    createDraft,
};

export default DraftService;
