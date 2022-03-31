import bodyParser from "body-parser";
import config from "config";
import express from "express";
import connect from "./db/connect";
import log from "./logger";
import todoRoutes from "./routes/todo.routes";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/todos", todoRoutes);

async function start() {
    await connect();
    app.listen(port, host, () => {
        log.info(`Server listing at http://${host}:${port}`);
    });
}

start();
