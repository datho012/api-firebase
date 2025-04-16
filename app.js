// app.js - Entry point for Vercel serverless function
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Set up API routes
app.use("/api/users", userRoutes);

// Default route for health check
app.get("/api", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
} );

// Start the server on port 3000
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export for Vercel serverless function
export default app;
