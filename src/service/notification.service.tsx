import api from "./api";

const getNotifications = async () => {
    const resp = await api.get(`notifications/unread`);
    return resp?.data;
};

const markNotificationRead = async (slug: number) => {
    const resp = await api.get(`notifications/read/${slug}`);
    return resp?.data;
};

const clearAllNotifications = async () => {
    const resp = await api.get(`notifications/clear`);
    return resp?.data;
};

const NotificationService = {
    getNotifications,
    markNotificationRead,
    clearAllNotifications,
};

export default NotificationService;
