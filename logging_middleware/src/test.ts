import { Log } from "./logger";

async function test() {
    const result = await Log(
        "backend",
        "error",
        "handler",
        "received string, expected bool"
    );

    console.log(result);
}

test();