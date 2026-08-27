import express from "express";
import authRouter from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());
app.use("/api/v1/auth",authRouter);
app.get("/health", async (req, res) => {
  return res.status(200).json({
    status: "OK",
  });
});

export default app;
