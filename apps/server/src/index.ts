import express from "express";

const app = express();

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Shapecrate API is running"
  });
});

// Vercel can import this Express app.
export default app;

// Run a local server during development.
if (process.env.NODE_ENV !== "production") {
  app.listen(4000, () => {
    console.log("API running at http://localhost:4000");
  });
}