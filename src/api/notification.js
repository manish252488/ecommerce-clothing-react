import { client } from "./client";

const NotificationsApi = {
    listNotifications: () =>  client.get("/notification/list"),
    updateNotificationView: () => client.get("/users/update-notification-view")
};

export default NotificationsApi;
