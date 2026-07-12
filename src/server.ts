import { config } from "@/config/env";
import { logger } from "@/config/logger";
import app from "./app";

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
logger.info("Server Started ");
