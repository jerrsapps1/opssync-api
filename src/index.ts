import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRouter from "./routes/health";

dotenv.config();

const app = express();
app.use(express.json());

// CORS — allow landing + app subdomain by default; ALLOWED_ORIGINS can override.
const defaultOrigins = ["https://opssync.ai", "https://app.opssync.ai"];
const allowed = (process.env.ALLOWED_ORIGINS || defaultOrigins.join(","))
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // allow non-browser tools (no origin) and whitelisted origins
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error("CORS blocked for origin: " + origin));
    },
    credentials: true
  })
);

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
