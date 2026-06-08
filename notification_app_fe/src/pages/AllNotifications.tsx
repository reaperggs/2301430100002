import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

import NotificationCard from "../components/NotificationCard";
import { getNotifications } from "../api/notificationApi";

export default function AllNotifications() {
    const [notifications, setNotifications] =
        useState([]);

    useEffect(() => {
        getNotifications()
            .then((data) => {
                setNotifications(data.notifications);
            })
            .catch(console.error);
    }, []);

    return (
        <Container>
            <Typography
                variant="h4"
                sx={{ my: 3 }}
            >
                All Notifications
            </Typography>

            {notifications.map((notification: any) => (
                <NotificationCard
                    key={notification.ID}
                    notification={notification}
                />
            ))}
        </Container>
    );
}