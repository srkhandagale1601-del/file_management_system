import express from "express";

const app = express();
app.use(express.json());
app.get("/health", async (req, res) => {
  return res.status(200).json({
    status: "OK",
  });
});
export default app;
