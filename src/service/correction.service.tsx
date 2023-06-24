import api from "./api";

const getMakeCorrection = async (slug: string) => {
    const resp = await api.get(`/journals/${slug}/make-correction`);
    return resp?.data;
};

const getCorrectionsForPost = async (slug: string) => {
    const resp = await api.get(`/journals/${slug}/corrections`);
    return resp?.data;
};

const deleteCorrection = async (data: {
    rowId: number;
    type: "correction" | "perfect";
}) => {
    const resp = await api.post(`corrections/delete`, data);
    return resp?.data;
};

const submitCorrections = async (
    slug: string,
    data: { overall_feedback: string },
) => {
    const resp = await api.post(`/journals/${slug}/make-correction/`, data);
    return resp;
};

const CorrectionService = {
    getMakeCorrection,
    getCorrectionsForPost,
    deleteCorrection,
    submitCorrections,
};

export default CorrectionService;
