import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LOG_API =
  "http://4.224.186.213/evaluation-service/logs";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const VALID_STACKS = [
  "backend",
  "frontend"
];

const VALID_LEVELS = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal"
];

export async function Log(
  stack: string,
  level: string,
  packageName: string,
  message: string
) {

  if (!VALID_STACKS.includes(stack)) {
    throw new Error(
      `Invalid stack: ${stack}`
    );
  }

  if (!VALID_LEVELS.includes(level)) {
    throw new Error(
      `Invalid level: ${level}`
    );
  }

  try {
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
          Authorization: `Bearer ${ACCESS_TOKEN}`,
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