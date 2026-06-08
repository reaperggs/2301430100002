import axios from "axios";

export async function fetchNotifications(token: string) {
    const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.notifications;
}