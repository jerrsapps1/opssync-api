import express from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import healthRouter from "./routes/health";

dotenv.config();

const app = express();
app.use(express.json());

const defaultOrigins = ["https://opssync.ai", "https://app.opssync.ai"];
const allowed = (process.env.ALLOWED_ORIGINS || defaultOrigins.join(","))
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowed.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS blocked for origin: " + origin));
  },
  credentials: true
};

app.use(cors(corsOptions));

// Base ping
app.get("/", (_req, res) => {
  res.send("✅ OpsSync API is running");
});

// Health routes
app.use(healthRouter);

// Start
const PORT = process.env.PORT || 3001; // Render injects PORT
app.listen(PORT, () => {
  console.log(`🚀 OpsSync API listening on port ${PORT}`);
});
