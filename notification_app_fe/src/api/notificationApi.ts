import axios from "axios";

export async function getNotifications(params?: Record<string, any>) {
    // If we have a limit or type, assume it's priority
    const isPriority = params && (params.limit || params.notification_type);
    const url = isPriority 
        ? "http://localhost:5000/api/notifications/priority"
        : "http://localhost:5000/api/notifications";

    const response = await axios.get(url, { params });

    return response.data;
}