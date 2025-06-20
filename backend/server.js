dotenv.config();
import app from './index.js';
import express from "express";
import dotenv from 'dotenv';
import path from 'path';

const PORT = process.env.PORT || 4001;

connectDB();

const dirname = path.resolve();

// Now you can use dirname
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/frontend/dist")));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});