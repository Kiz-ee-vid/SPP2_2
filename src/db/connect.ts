import config from "config";
import mongoose from "mongoose";
import log from "../logger";

async function connect() {
    const dbUri = config.get("dbUri") as string;

    return await mongoose
        .connect(dbUri)
        .then(() => {
            log.info("Database connected");
        })
        .catch((error) => {
            log.error("Cannot connect to the database", error);
            process.exit(1);
        });
}

export default connect;
