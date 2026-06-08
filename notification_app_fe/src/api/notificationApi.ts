import axios from "axios";

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }
  const response = await axios.post("http://4.224.186.213/evaluation-service/auth", {
    email: "a2023cse9317@imsec.ac.in",
    name: "aakash chauhan",
    rollNo: "2301430100002",
    accessCode: "nyXQMu",
    clientID: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET
  });
  
  cachedToken = response.data.access_token;
  tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 5000;
  return cachedToken;
}

export async function getNotifications(params?: Record<string, any>) {
    const token = await getToken();

    const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params
        }
    );

    return response.data;
}