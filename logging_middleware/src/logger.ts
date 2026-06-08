import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LOG_API = "http://4.224.186.213/evaluation-service/logs";
const AUTH_API = "http://4.224.186.213/evaluation-service/auth";

const VALID_STACKS = ["backend", "frontend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];

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

export async function Log(
  stack: string,
  level: string,
  packageName: string,
  message: string
) {

  if (!VALID_STACKS.includes(stack)) {
    throw new Error(`Invalid stack: ${stack}`);
  }

  if (!VALID_LEVELS.includes(level)) {
    throw new Error(`Invalid level: ${level}`);
  }

  try {
    const token = await getToken();
    const response = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error: any) {
    console.error(
      "Logging failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}