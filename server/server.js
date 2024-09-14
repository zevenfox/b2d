import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});