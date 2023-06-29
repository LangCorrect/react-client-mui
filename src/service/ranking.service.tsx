import api from "./api";

const getRankings = async () => {
    const resp = await api.get(`rankings/`);
    return resp?.data;
};

const RankingService = {
    getRankings,
};

export default RankingService;
