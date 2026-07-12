import dotenv from "dotenv";
dotenv.config();
export const config = {
  PORT: Number(process.env.PORT) || 5000,
  DATABASE_URL: String(process.env.DATABASE_URL),
};
