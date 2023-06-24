import { ICorrectionDraft } from "../pages/MakeCorrectionPage";
import api from "./api";

const createDraft = async (data: ICorrectionDraft) => {
    const resp = await api.post(`drafts/`, data);
    return resp?.data;
};

const DraftService = {
    createDraft,
};

export default DraftService;
