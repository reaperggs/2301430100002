import dotenv from "dotenv";
import { fetchNotifications } from "./api";
import { getTopNotifications } from "./priorityInbox";

dotenv.config();

async function main() {
    const token = process.env.ACCESS_TOKEN!;

    const notifications = await fetchNotifications(token);

    const top10 = getTopNotifications(
        notifications,
        10
    );

    console.table(top10);
}

main();