import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";
import { fetchNotifications } from "./api";
import { getTopNotifications } from "./priorityInbox";

dotenv.config();

const app = express();
app.use(cors());

const AUTH_API = "http://4.224.186.213/evaluation-service/auth";

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }
  const response = await axios.post(AUTH_API, {
    email: "a2023cse9317@imsec.ac.in",
    name: "aakash chauhan",
    rollNo: "2301430100002",
    accessCode: "nyXQMu",
    clientID: "33d6b5df-2edb-49ef-8b18-71ae3bdaa45c",
    clientSecret: "mUvvztfCPEdBDNDd"
  });
  cachedToken = response.data.access_token;
  tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 5000;
  return cachedToken;
}

app.get('/api/notifications', async (req: any, res: any) => {
    try {
        const token = await getToken();
        // Just forward to our api
        const response = await axios.get("http://4.224.186.213/evaluation-service/notifications", {
            headers: { Authorization: `Bearer ${token}` },
            params: req.query
        });
        res.json({ notifications: response.data.notifications });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

app.get('/api/notifications/priority', async (req: any, res: any) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const type = req.query.notification_type as string;

        const token = await getToken();
        const response = await axios.get("http://4.224.186.213/evaluation-service/notifications", {
            headers: { Authorization: `Bearer ${token}` }
        });

        let notifications = response.data.notifications;
        if (type) {
            notifications = notifications.filter((n: any) => n.Type === type);
        }

        const top10 = getTopNotifications(notifications, limit);
        res.json({ notifications: top10 });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch priority notifications' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});