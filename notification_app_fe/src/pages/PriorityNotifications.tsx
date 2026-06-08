import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

import NotificationCard from "../components/NotificationCard";
import { getNotifications } from "../api/notificationApi";

export default function PriorityNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [limit, setLimit] = useState("10");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const params: any = { limit };
        if (type) params.notification_type = type;
        
        getNotifications(params)
            .then((data) => {
                setNotifications(data.notifications || []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [limit, type]);

    const handleLimitChange = (e: SelectChangeEvent) => {
        setLimit(e.target.value as string);
    };

    const handleTypeChange = (e: SelectChangeEvent) => {
        setType(e.target.value as string);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 3 }}>
                Priority Notifications
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Limit</InputLabel>
                    <Select value={limit} label="Limit" onChange={handleLimitChange}>
                        <MenuItem value="5">Top 5</MenuItem>
                        <MenuItem value="10">Top 10</MenuItem>
                        <MenuItem value="20">Top 20</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Type Filter</InputLabel>
                    <Select value={type} label="Type Filter" onChange={handleTypeChange}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Event">Event</MenuItem>
                        <MenuItem value="Result">Result</MenuItem>
                        <MenuItem value="Placement">Placement</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : notifications.length === 0 ? (
                <Typography color="text.secondary">No notifications found.</Typography>
            ) : (
                notifications.map((notification: any) => (
                    <NotificationCard
                        key={notification.ID}
                        notification={notification}
                    />
                ))
            )}
        </Container>
    );
}