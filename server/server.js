import express from "express";
import cors from "cors";
import path from "path";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use('/images', express.static(path.join(__dirname, '../client/src/images')));

app.get("/api/StartUps/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const startup = await prisma.startUp.findUnique({ where: { id: parseInt(id) } });
    if (startup) {
      res.json(startup);
    } else {
      res.status(404).json({ error: "Startup not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the startup." });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});