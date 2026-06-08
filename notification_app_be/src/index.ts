import dotenv from "dotenv";
import axios from "axios";
import { fetchNotifications } from "./api";
import { getTopNotifications } from "./priorityInbox";

dotenv.config();

const AUTH_API = "http://4.224.186.213/evaluation-service/auth";

async function getToken() {
  const response = await axios.post(AUTH_API, {
    email: "a2023cse9317@imsec.ac.in",
    name: "aakash chauhan",
    rollNo: "2301430100002",
    accessCode: "nyXQMu",
    clientID: "33d6b5df-2edb-49ef-8b18-71ae3bdaa45c",
    clientSecret: "mUvvztfCPEdBDNDd"
  });
  return response.data.access_token;
}

async function main() {
    const token = await getToken();

    const notifications = await fetchNotifications(token);

    const top10 = getTopNotifications(
        notifications,
        10
    );

    console.table(top10);
}

main();