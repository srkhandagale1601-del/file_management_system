import { config } from "./config/env";
import app from "./app";

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
