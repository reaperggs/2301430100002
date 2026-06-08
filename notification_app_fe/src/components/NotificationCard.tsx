import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Button
} from "@mui/material";

interface Props {
    notification: any;
}

export default function NotificationCard({
    notification,
}: Props) {
    const [isRead, setIsRead] = useState(false);

    useEffect(() => {
        const readList = JSON.parse(localStorage.getItem("readNotifications") || "[]");
        if (readList.includes(notification.ID)) {
            setIsRead(true);
        }
    }, [notification.ID]);

    const handleToggleRead = () => {
        const readList = JSON.parse(localStorage.getItem("readNotifications") || "[]");
        if (isRead) {
            const updated = readList.filter((id: string) => id !== notification.ID);
            localStorage.setItem("readNotifications", JSON.stringify(updated));
            setIsRead(false);
        } else {
            readList.push(notification.ID);
            localStorage.setItem("readNotifications", JSON.stringify(readList));
            setIsRead(true);
        }
    };

    return (
        <Card 
            sx={{ 
                mb: 2, 
                opacity: isRead ? 0.6 : 1, 
                borderLeft: isRead ? '4px solid transparent' : '4px solid #1976d2',
                transition: '0.3s'
            }}
        >
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Chip
                        label={notification.Type}
                        color={
                            notification.Type === "Event" ? "primary" : 
                            notification.Type === "Result" ? "success" : "warning"
                        }
                        size="small"
                    />
                    <Button size="small" onClick={handleToggleRead}>
                        {isRead ? "Mark as Unread" : "Mark as Read"}
                    </Button>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: isRead ? "normal" : "bold" }}>
                    {notification.Message}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    {new Date(notification.Timestamp).toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
}