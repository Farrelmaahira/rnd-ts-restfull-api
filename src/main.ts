import { web } from "./application/web";
import dotenv from "dotenv";
import { logger } from "./application/logging";
dotenv.config();
const PORT = process.env.PORT;

web.listen(PORT, () => {
    logger.info(`running on ${PORT}`)
});

