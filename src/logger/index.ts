import dayjs from "dayjs";
import logger from "pino";

const log = logger({
    prettyPrint: true,
    // tslint:disable-next-line:object-literal-sort-keys
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
